import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;
    
    // Get client IP and user agent
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert view record
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
      // Don't return error to client, just log it
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in project view tracking:", error);
    return NextResponse.json({ success: true }); // Always return success to not break user experience
  }
} 