import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";
import { supabase } from "@/utils/supabase";


type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  
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

export async function POST(request: NextRequest, { params }: Context) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { memberId, role } = body;

  console.log("Adding team member:", { projectId: id, memberId, role, userId });

  if (!memberId || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Check if user is project owner and if member already exists in parallel
  const [projectResult, existingMemberResult] = await Promise.all([
    supabase
      .from("projects")
      .select("author_id")
      .eq("id", id)
      .single(),
    
    supabase
      .from("project_members")
      .select("id")
      .eq("project_id", id)
      .eq("user_id", memberId)
      .single()
  ]);

  const { data: project, error: projectError } = projectResult;
  const { data: existingMember } = existingMemberResult;

  if (projectError) {
    console.error("Error checking project ownership:", projectError);
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (!project || project.author_id !== userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  if (existingMember) {
    return NextResponse.json({ error: "User is already a team member" }, { status: 400 });
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

  console.log("Team member added successfully:", data);
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get("memberId");

  if (!memberId) {
    return NextResponse.json({ error: "Missing memberId parameter" }, { status: 400 });
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

  const { error } = await supabase
    .from("project_members")
    .delete()
    .eq("project_id", id)
    .eq("user_id", memberId);

  if (error) {
    console.error("Error removing team member:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Team member removed successfully" }, { status: 200 });
} 