import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const projectId = searchParams.get("projectId");
  const excludeTeam = searchParams.get("excludeTeam") === "true";

  if (!query || query.trim().length < 2) {
    return NextResponse.json([]);
  }

  try {
    let usersQuery = supabase
      .from("users")
      .select("id, name, username, bio, skills")
      .or(`name.ilike.%${query}%,username.ilike.%${query}%`)
      .neq("id", userId) 
      .limit(10);

    if (excludeTeam && projectId) {
      const { data: existingMembers } = await supabase
        .from("project_members")
        .select("user_id")
        .eq("project_id", projectId);

      if (existingMembers && existingMembers.length > 0) {
        const memberIds = existingMembers.map(m => m.user_id);
        usersQuery = usersQuery.not("id", "in", `(${memberIds.join(",")})`);
      }
    }

    const { data: users, error } = await usersQuery;

    if (error) {
      console.error("Error searching users:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(users || []);
  } catch (error) {
    console.error("Error in user search:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
} 