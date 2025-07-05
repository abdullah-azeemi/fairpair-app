import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  

  const { data: project } = await supabase
    .from("projects")
    .select("author_id")
    .eq("id", id)
    .single();

  if (!project || project.author_id !== userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const updateData: any = {
    updated_at: new Date().toISOString()
  };

  if (body.title) updateData.title = body.title;
  if (body.description) updateData.description = body.description;
  if (body.skills_needed) updateData.skills_needed = body.skills_needed;
  if (body.timeline) updateData.timeline = body.timeline;
  if (body.teamsize) updateData.teamsize = body.teamsize;
  if (body.project_type) updateData.project_type = body.project_type;
  if (body.experience) updateData.experience = body.experience;
  if (body.lookingForCollaborators !== undefined) updateData.lookingForCollaborators = body.lookingForCollaborators;
  if (body.progress !== undefined) updateData.progress = body.progress;
  if (body.tech_stack) updateData.tech_stack = body.tech_stack;
  if (body.milestones !== undefined) updateData.milestones = body.milestones;

  console.log("PATCH /projects/:id/update updateData:", updateData);

  const { data, error } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
} 