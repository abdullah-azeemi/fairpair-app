import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ isInterested: false });
  }
  const { data } = await supabase
    .from("project_interests")
    .select("id")
    .eq("project_id", id)
    .eq("user_id", userId)
    .single();
  return NextResponse.json({ isInterested: !!data });
}

export async function POST(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
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
    .insert([
      {
        project_id: id,
        user_id: userId,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const { error } = await supabase
    .from("project_interests")
    .delete()
    .eq("project_id", id);
  if (error) {
    console.error("Error deleting project interest:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Project interest deleted" });
} 