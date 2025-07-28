import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("userId");
  let userId: string | null = userIdParam ?? null;
  if (!userId) {
    const session = await getServerSession(authOptions);
    userId = session?.user?.id ?? null;
  }
  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, username, bio, skills, interests, github, linkedin, email, created_at")
    .eq("id", userId)
    .single();
  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}