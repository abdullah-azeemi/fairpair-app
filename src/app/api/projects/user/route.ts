import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
  const mapped = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    skills: p.skills_needed,
    createdAt: new Date(p.created_at).toLocaleDateString(),
    views: Math.floor(Math.random() * 100),
    collaborators: Math.floor(Math.random() * 5),
    status: p.status,
  }));
  return NextResponse.json(mapped);
}