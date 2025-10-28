import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!; 

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase.from("profiles").select("id").limit(1);

    if (error) {
      console.error("[cron] supabase error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, time: new Date().toISOString(), rows: data?.length ?? 0 });
  } catch (err: any) {
    console.error("[cron] unexpected error:", err);
    return NextResponse.json({ ok: false, error: err?.message ?? "unknown" }, { status: 500 });
  }
}
