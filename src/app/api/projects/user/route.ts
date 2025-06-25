import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const userId = "cmc4n4nhy00005amoidqqlvft"; // Replace with actual user ID from session/auth
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, skillsNeeded, createdAt, status")
    .eq("authorId", userId)
    .order("createdAt", { ascending: false });
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  if (!projects) return NextResponse.json({ message: "Projects not Found" }, { status: 404 });
  const mapped = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    skills: p.skillsNeeded,
    createdAt: new Date(p.createdAt).toLocaleDateString(),
    views: Math.floor(Math.random() * 100),
    collaborators: Math.floor(Math.random() * 5),
    status: p.status,
  }));
  return NextResponse.json(mapped);
}