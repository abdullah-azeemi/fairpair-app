import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await context.params;

  const { data: existing } = await supabase
    .from("project_interests")
    .select("id")
    .eq("project_id", id)
    .eq("user_id", userId)
    .single();

  if (existing) {
    return NextResponse.json({ message: "Already interested in this project" });
  }

  const { data, error } = await supabase
    .from("project_interests")
    .insert([{
      project_id: id,
      user_id: userId,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await context.params;

  const { error } = await supabase
    .from("project_interests")
    .delete()
    .eq("project_id", id)
    .eq("user_id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Interest removed successfully" });
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ isInterested: false });
  }

  const { id } = await context.params;

  const { data } = await supabase
    .from("project_interests")
    .select("id")
    .eq("project_id", id)
    .eq("user_id", userId)
    .single();

  return NextResponse.json({ isInterested: !!data });
} 