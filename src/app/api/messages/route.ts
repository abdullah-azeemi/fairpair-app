import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const recipientId = searchParams.get("recipientId");
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  let data, error;
  if (recipientId) {
    ({ data, error } = await supabase
      .from("messages")
      .select("id, sender_id, receiver_id, content, created_at")
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${recipientId}),and(sender_id.eq.${recipientId},receiver_id.eq.${userId})`)
      .order("created_at", { ascending: true }));
  } else {
    ({ data, error } = await supabase
      .from("messages")
      .select("id, sender_id, receiver_id, content, created_at")
      .eq("receiver_id", userId)
      .order("created_at", { ascending: false }));
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { sender_id, receiver_id, content } = body;
  if (!sender_id || !receiver_id || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("messages")
    .insert([{ sender_id, receiver_id, content }])
    .select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || !data[0]) return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  return NextResponse.json(data[0]);
}
