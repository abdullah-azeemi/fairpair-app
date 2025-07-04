import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "User not found" }, { status: 401 });

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("skills")
    .eq("id", userId)
    .single();
  if (userError || !user || !user.skills) {
    return NextResponse.json({ error: "User skills not found" }, { status: 404 });
  }

  const userSkills = Array.isArray(user.skills)
    ? user.skills
    : typeof user.skills === "string"
      ? user.skills.split(",").map((s: string) => s.trim())
      : [];

  if (userSkills.length === 0) {
    return NextResponse.json([], { status: 200 });
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, title, author_id, skills_needed, description, created_at")
    .overlaps("skills_needed", userSkills)
    .neq("author_id", userId) 
    .order("created_at", { ascending: false })
    .limit(10);

  if (projectsError) {
    return NextResponse.json({ error: projectsError.message }, { status: 500 });
  }

  const recommendations = (projects || []).map((project: any) => ({
    ...project,
    matchingSkills: Array.isArray(project.skills_needed)
      ? project.skills_needed.filter((skill: string) => userSkills.includes(skill)).length
      : 0,
  }));

  return NextResponse.json(recommendations);
}