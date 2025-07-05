import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { error } = await supabase
    .from("projects")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Project archived successfully" }, { status: 200 });
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  
  // Fetch project with author details
  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      *,
      author:users!projects_author_id_fkey(
        id,
        name,
        username,
        bio,
        skills,
        github,
        linkedin,
        email,
        created_at
      )
    `)
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  // Fetch team members (if any)
  const { data: teamMembers, error: teamError } = await supabase
    .from("project_members")
    .select(`
      role,
      joined_at,
      user:users(
        id,
        name,
        username,
        bio,
        skills
      )
    `)
    .eq("project_id", id)
    .eq("status", "accepted");

  if (teamError) {
    console.error("Error fetching team members:", teamError);
  }

  // Fetch project stats
  const { count: views } = await supabase
    .from("project_views")
    .select("*", { count: "exact", head: true })
    .eq("project_id", id);

  const { count: interested } = await supabase
    .from("project_interests")
    .select("*", { count: "exact", head: true })
    .eq("project_id", id);

  // Transform the data
  const transformedProject = {
    ...project,
    skillsNeeded: project.skills_needed || [],
    techStack: project.tech_stack || [],
    progress: project.progress || 0,
    milestones: project.milestones || [],
    createdAt: project.created_at,
    updatedAt: project.updated_at || project.created_at,
    views: views || 0,
    interested: interested || 0,
    currentTeam: (() => {
      const teamFromMembers = (teamMembers || []).map((member: any) => ({
        id: member.user.id,
        name: member.user.name,
        username: member.user.username,
        role: member.role,
        joinedAt: member.joined_at,
        bio: member.user.bio,
        skills: member.user.skills || []
      }));

      const authorInTeam = teamFromMembers.some(member => member.id === project.author.id);
      if (!authorInTeam) {
        teamFromMembers.unshift({
          id: project.author.id,
          name: project.author.name,
          username: project.author.username,
          role: "Owner",
          joinedAt: project.created_at,
          bio: project.author.bio,
          skills: project.author.skills || []
        });
      }

      return teamFromMembers;
    })(),
    author: {
      id: project.author.id,
      name: project.author.name,
      username: project.author.username,
      bio: project.author.bio,
      skills: project.author.skills || [],
      joinedDate: new Date(project.author.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      links: {
        github: project.author.github,
        linkedin: project.author.linkedin,
        email: project.author.email
      }
    }
  };

  return NextResponse.json(transformedProject, { status: 200 });
}