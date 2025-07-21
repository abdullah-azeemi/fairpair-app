import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json([], { status: 200 });
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, skills_needed, created_at, status")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json([], { status: 200 });
  if (!projects) return NextResponse.json([], { status: 200 });

  // Fetch view counts for all projects
  const projectIds = projects.map(p => p.id);
  const viewPromises = projectIds.map(async (projectId) => {
    const { count } = await supabase
      .from("project_views")
      .select("*", { count: "exact", head: true })
      .eq("project_id", projectId);
    return { projectId, views: count || 0 };
  });

  // Fetch collaborator counts
  const collaboratorPromises = projectIds.map(async (projectId) => {
    const { count } = await supabase
      .from("project_members")
      .select("*", { count: "exact", head: true })
      .eq("project_id", projectId)
      .eq("status", "accepted");
    return { projectId, collaborators: count || 0 };
  });

  const [viewResults, collaboratorResults] = await Promise.all([
    Promise.all(viewPromises),
    Promise.all(collaboratorPromises)
  ]);

  const viewsMap = new Map(viewResults.map(r => [r.projectId, r.views]));
  const collaboratorsMap = new Map(collaboratorResults.map(r => [r.projectId, r.collaborators]));

  const mapped = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    skills: p.skills_needed,
    createdAt: new Date(p.created_at).toLocaleDateString(),
    views: viewsMap.get(p.id) || 0,
    collaborators: collaboratorsMap.get(p.id) || 0,
    status: p.status,
  }));

  return NextResponse.json(mapped);
}