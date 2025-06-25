import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, username, email, bio, github, linkedin, skills, interests, password } = body;
    const { data: newUser, error } = await supabase.from("users").insert([
      { name, username, email, bio, github, linkedin, skills, interests, password }
    ]).select().single();
    if (error) throw error;
    return NextResponse.json({ success: true, user: newUser });
  } catch (error: any) {
    console.log("Signup error", error);
    // Return the actual error message from Supabase
    return NextResponse.json({ success: false, error: error?.message || JSON.stringify(error) }, { status: 500 });
  }
}