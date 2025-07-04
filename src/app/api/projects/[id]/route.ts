import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
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

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error } = await supabase
    .from("projects")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Project archived successfully" }, { status: 200 });
}

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, skills_needed, created_at, status, author_id")
    .eq("id", id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}