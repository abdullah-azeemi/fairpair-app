import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

type Context = {
  params: Promise<{ id: string }>;
};

async function getUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id;
}

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ isFavorited: false });

  const { data: user } = await supabase
    .from("users")
    .select("favorites")
    .eq("id", userId)
    .single();

  const isFavorited = user?.favorites?.includes(id) ?? false;
  return NextResponse.json({ isFavorited });
}

export async function POST(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("favorites")
    .eq("id", userId)
    .single();

  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });

  if (user.favorites?.includes(id)) {
    return NextResponse.json({ message: "Already in favorites" });
  }

  const newFavorites = [...(user.favorites || []), id];

  const { error } = await supabase
    .from("users")
    .update({ favorites: newFavorites })
    .eq("id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("favorites")
    .eq("id", userId)
    .single();

  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });

  const newFavorites = (user.favorites || []).filter((favId: string) => favId !== id);

  const { error } = await supabase
    .from("users")
    .update({ favorites: newFavorites })
    .eq("id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}