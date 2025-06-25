import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, skillsNeeded, createdAt, status")
    .order("createdAt", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(projects);
}