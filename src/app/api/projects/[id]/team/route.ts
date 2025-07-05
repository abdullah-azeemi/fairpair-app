import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  
  const { data: teamMembers, error } = await supabase
    .from("project_members")
    .select(`
      id,
      role,
      status,
      joined_at,
      user:users(
        id,
        name,
        username,
        bio,
        skills
      )
    `)
    .eq("project_id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(teamMembers || []);
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const { memberId, role } = body;

  if (!memberId || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Check if user is project owner
  const { data: project } = await supabase
    .from("projects")
    .select("author_id")
    .eq("id", id)
    .single();

  if (!project || project.author_id !== userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // Check if project_members table exists, if not create it
  const { error: tableCheck } = await supabase
    .from("project_members")
    .select("id")
    .limit(1);

  if (tableCheck && tableCheck.code === 'PGRST204') {
    // Table doesn't exist, create it
    const { error: createTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS project_members (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          role TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(project_id, user_id)
        );
        
        ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view project members" ON project_members
          FOR SELECT USING (true);
        
        CREATE POLICY "Project owners can manage team" ON project_members
          FOR ALL USING (
            EXISTS (
              SELECT 1 FROM projects 
              WHERE id = project_members.project_id 
              AND author_id = auth.uid()
            )
          );
        
        GRANT ALL ON project_members TO service_role;
      `
    });

    if (createTableError) {
      console.error("Error creating project_members table:", createTableError);
      return NextResponse.json({ error: "Failed to setup team management" }, { status: 500 });
    }
  }

  // Add team member
  const { data, error } = await supabase
    .from("project_members")
    .insert([{
      project_id: id,
      user_id: memberId,
      role: role,
      status: "accepted"
    }])
    .select()
    .single();

  if (error) {
    console.error("Error adding team member:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get("memberId");

  if (!memberId) {
    return NextResponse.json({ error: "Missing member ID" }, { status: 400 });
  }

  // Check if user is project owner
  const { data: project } = await supabase
    .from("projects")
    .select("author_id")
    .eq("id", id)
    .single();

  if (!project || project.author_id !== userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  // Remove team member
  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("project_id", id)
    .eq("user_id", memberId);

  if (error) {
    console.error("Error removing team member:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
} 