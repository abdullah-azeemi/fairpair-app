import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { verify } from "argon2";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Missing email or password" }, { status: 400 });
    }
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }
    const isValid = await verify(user.password, password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }
    return NextResponse.json({ success: true, user: { id: user._id, email: user.email, username: user.username } });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
} 