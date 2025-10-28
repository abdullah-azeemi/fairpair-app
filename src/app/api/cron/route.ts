import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET() {
  try {
    const { error } = await supabase.from("users").select("id").limit(1);
    if (error) throw error;

    return NextResponse.json({ ok: true, time: new Date().toISOString() });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("[ping] unexpected error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
