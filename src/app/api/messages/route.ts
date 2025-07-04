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
  const user1 = searchParams.get("user1");
  const user2 = searchParams.get("user2");
  if (!user1 || !user2) return NextResponse.json({ error: "Missing user ids" }, { status: 400 });

  const { data, error } = await supabase
    .from("messages")
    .select("id, sender_id, receiver_id, content, created_at")
    .or(`and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`)
    .order("created_at", { ascending: true });

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
