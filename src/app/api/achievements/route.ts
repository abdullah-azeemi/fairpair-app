import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json([], { status: 200 });
  const { data: achievements, error } = await supabase
    .from("achievements")
    .select("id, type, awarded_at")
    .eq("user_id", userId)
    .order("awarded_at", { ascending: false })
    .limit(20);
  if (error) return NextResponse.json([], { status: 200 });
  return NextResponse.json(achievements || []);
}
