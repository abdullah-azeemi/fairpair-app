import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

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

  console.log("User search request:", { query, projectId, excludeTeam, userId });

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
      usersQuery = usersQuery.not("id", "in", 
        `(SELECT user_id FROM project_members WHERE project_id = '${projectId}')`
      );
    }

    const { data: users, error } = await usersQuery;

    if (error) {
      console.error("Error searching users:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Search results:", users);
    return NextResponse.json(users || []);
  } catch (error) {
    console.error("Error in user search:", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : "Search failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 