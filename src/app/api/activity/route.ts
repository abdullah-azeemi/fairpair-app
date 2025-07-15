import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return NextResponse.json([], { status: 200 });
  const { data: activity, error } = await supabase
    .from("activity")
    .select("id, type, details, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return NextResponse.json([], { status: 200 });
  return NextResponse.json(activity || []);
}
