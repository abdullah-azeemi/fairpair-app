import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, skills_needed, created_at, status, author_id")
    .eq("status", "open")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const mapped = (projects || []).map((p) => ({
    ...p,
    skillsNeeded: p.skills_needed || [],
    createdAt: p.created_at,
  }));
  return NextResponse.json(mapped);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const body = await req.json();
    const {
      title,
      description,
      category,
      skillsNeeded,
      lookingForCollaborators,
      timeline,
      teamSize,
      projectType,
      experience
    } = body;
    if (!title || !description || !category || !skillsNeeded || skillsNeeded.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const { data: newProject, error } = await supabase.from("projects").insert([
      {
        title,
        description,
        category,
        skills_needed: skillsNeeded,
        lookingForCollaborators,
        timeline,
        teamsize: teamSize,
        project_type: projectType,
        experience,
        created_at: new Date().toISOString(),
        status: "open",
        author_id: userId
      }
    ]).select().single();
    if (error) throw error;

    try {
      await supabase.from("project_members").insert([
        {
          project_id: newProject.id,
          user_id: userId,
          role: "Owner",
          status: "accepted",
          joined_at: new Date().toISOString()
        }
      ]);
    } catch (memberError) {
      console.error("Error adding author to project team:", memberError);

    }
    await supabase.from("activity").insert([
      {
        user_id: userId,
        type: "project_posted",
        details: { project_id: newProject.id, title },
      }
    ]);
    const { count } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("author_id", userId);

    if (count === 1) {
      await supabase.from("achievements").insert([
        { user_id: userId, type: "first_project" }
      ]);
    }
    return NextResponse.json({ success: true, project: newProject });
  } catch (error: any) {
    console.error("Project creation error", error);
    return NextResponse.json({ error: error?.message || "Failed to create project" }, { status: 500 });
  }
}