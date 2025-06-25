import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  const userId = "cmc4n4nhy00005amoidqqlvft"; // Replace with actual user ID from session/auth
  const { data: user, error } = await supabase
    .from("users")
    .select("id, name, username, bio, skills, interests, github, linkedin, email, createdAt")
    .eq("id", userId)
    .single();
  if (error || !user) {
    console.log("User not Found", error);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}