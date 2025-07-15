import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";
import { hash } from "argon2";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, username, email, bio, github, linkedin, skills, interests, password } = body;
    // Hash the password before storing
    const hashedPassword = await hash(password);
    const { data: newUser, error } = await supabase.from("users").insert([
      { name, username, email, bio, github, linkedin, skills, interests, password: hashedPassword }
    ]).select().single();
    if (error) {
      // Handle duplicate email/username error
      if (error.code === '23505' || error.message?.includes('duplicate')) {
        return NextResponse.json({ success: false, error: 'Email or username already exists' }, { status: 400 });
      }
      throw error;
    }
    return NextResponse.json({ success: true, user: newUser });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: error?.message || JSON.stringify(error) }, { status: 500 });
  }
}