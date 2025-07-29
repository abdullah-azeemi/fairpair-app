import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

type Context = {
  params: Promise<{ id: string }>;
};

type TeamMember = {
  role: string;
  joined_at: string;
  user: {
    id: string;
    name: string;
    username: string;
    bio?: string;
    skills?: string[];
  }[];
};

export async function DELETE(request: NextRequest, { params }: Context) {
  const { id } = await params;
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

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  
  // Fetch project with author details and team members in parallel
  const [projectResult, teamMembersResult, viewsResult, interestedResult] = await Promise.all([
    supabase
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
      .single(),
    
    supabase
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
      .eq("status", "accepted"),
    
    supabase
      .from("project_views")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id),
    
    supabase
      .from("project_interests")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
  ]);

  const { data: project, error } = projectResult;
  const { data: teamMembers, error: teamError } = teamMembersResult;
  const { count: views } = viewsResult;
  const { count: interested } = interestedResult;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  if (teamError) {
    console.error("Error fetching team members:", teamError);
  }

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
      const teamFromMembers = (teamMembers || []).map((member: TeamMember) => {
        const user = member.user && member.user.length > 0 ? member.user[0] : undefined;
        return {
          id: user?.id,
          name: user?.name,
          username: user?.username,
          role: member.role,
          joinedAt: member.joined_at,
          bio: user?.bio,
          skills: user?.skills || []
        };
      });

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

  return NextResponse.json(transformedProject, { 
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
    }
  });
}