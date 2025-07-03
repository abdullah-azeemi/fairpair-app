import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE_SERVICE_ROLE_KEY length:", process.env.SUPABASE_SERVICE_ROLE_KEY?.length);
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  console.log("userId", userId);
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  // Log before querying messages
  console.log("Querying messages for userId:", userId);

  const { data: messages, error } = await supabase
    .from("messages")
    .select("sender_id, receiver_id")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

  if (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log("Fetched messages:", messages);

  const userIds = Array.from(
    new Set(
      (messages ?? [])
        .map((msg: { sender_id: string; receiver_id: string }) =>
          msg.sender_id === userId ? msg.receiver_id : msg.sender_id
        )
        .filter((id: string) => id !== userId)
    )
  );
  console.log("userIds for conversation:", userIds);

  if (!userIds.length) return NextResponse.json([]);

  // Log before querying users
  console.log("Querying users with ids:", userIds);

  const { data: users, error: userError } = await supabase
    .from("users")
    .select("id, username")
    .in("id", userIds);

  if (userError) {
    console.error("Error fetching users:", userError);
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }
  console.log("Fetched users:", users);

  return NextResponse.json(users);
}