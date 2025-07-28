import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const currentUserId = searchParams.get("userId");

  if (!currentUserId || currentUserId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {

    const { data: messages, error: msgError } = await supabase
      .from("messages")
      .select("sender_id, receiver_id")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
    if (msgError) {
      console.error("Error fetching messages for conversations:", msgError);
      return NextResponse.json({ error: msgError.message }, { status: 500 });
    }
    const partnerIds = new Set<string>();
    (messages || []).forEach((msg: { sender_id: string; receiver_id: string }) => {
      if (msg.sender_id !== userId) partnerIds.add(msg.sender_id);
      if (msg.receiver_id !== userId) partnerIds.add(msg.receiver_id);
    });
    if (partnerIds.size === 0) return NextResponse.json([]);

    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id, username")
      .in("id", Array.from(partnerIds));
    if (userError) {
      console.error("Error fetching users for conversations:", userError);
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json(users || []);
  } catch (error) {
    console.error("Error in conversations API:", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : "Failed to fetch conversations";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}