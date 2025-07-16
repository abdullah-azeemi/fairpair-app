import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type MessageRow = {
  sender_id: string;
  receiver_id: string;
  created_at: string;
  sender: { id: string; username: string }[];
  receiver: { id: string; username: string }[];
};

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
    // Get unique conversation partners from messages
    const { data: conversations, error } = await supabase
      .from("messages")
      .select(`
        sender_id,
        receiver_id,
        created_at,
        sender:users!messages_sender_id_fkey(id, username),
        receiver:users!messages_receiver_id_fkey(id, username)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get unique conversation partners
    const conversationPartners = new Map();
    
    (conversations as MessageRow[] | undefined)?.forEach((msg: MessageRow) => {
      const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      const partnerArr = msg.sender_id === userId ? msg.receiver : msg.sender;
      const partner = partnerArr && partnerArr.length > 0 ? partnerArr[0] : undefined;
      
      if (!conversationPartners.has(partnerId) && partnerId !== userId) {
        conversationPartners.set(partnerId, {
          id: partnerId,
          username: partner?.username || "Unknown User"
        });
      }
    });

    return NextResponse.json(Array.from(conversationPartners.values()));
  } catch (error) {
    console.error("Error in conversations API:", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : "Failed to fetch conversations";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}