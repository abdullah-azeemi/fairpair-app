import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, { params }: Context) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const { error } = await supabase
      .from("project_views")
      .insert([{
        project_id: id,
        user_id: userId,
        ip_address: ip,
        user_agent: userAgent,
        viewed_at: new Date().toISOString()
      }]);

    if (error) {
      console.error("Error tracking project view:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in project view tracking:", error);
    return NextResponse.json({ success: true }); 
  }
} 