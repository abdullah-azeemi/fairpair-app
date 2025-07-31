import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("favorites")
    .eq("id", userId)
    .single();

  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });

  const favorites = user.favorites || [];
  if (favorites.length === 0) return NextResponse.json([]);

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .in("id", favorites);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const sorted = favorites.map((id: string) => projects.find((p: { id: string }) => p.id === id)).filter(Boolean);

  return NextResponse.json(sorted);
}