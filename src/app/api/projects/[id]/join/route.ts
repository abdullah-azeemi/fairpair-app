import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { supabase } from "@/utils/supabase";

type Context = {
  params: Promise<{ id: string }>;
};

// Get join requests for a project (for project owner)
export async function GET(request: NextRequest, { params }: Context) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: projectId } = await params;

    // Check if user is project owner
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("author_id")
      .eq("id", projectId)
      .single();

    if (projectError) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.author_id !== userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Get all join requests for this project
    const { data: joinRequests, error: requestsError } = await supabase
      .from("project_join_requests")
      .select(`
        id,
        message,
        status,
        created_at,
        user:users(
          id,
          name,
          username,
          bio,
          skills
        )
      `)
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (requestsError) {
      console.error("Error fetching join requests:", requestsError);
      return NextResponse.json({ error: "Failed to fetch join requests" }, { status: 500 });
    }

    return NextResponse.json(joinRequests || []);
  } catch (error) {
    console.error("Error in GET join requests:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Create a join request
export async function POST(request: NextRequest, { params }: Context) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: projectId } = await params;
    const body = await request.json();
    const { message } = body;

    // Check if project exists
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("author_id, title")
      .eq("id", projectId)
      .single();

    if (projectError) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Check if user is already a team member
    const { data: existingMember } = await supabase
      .from("project_members")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .single();

    if (existingMember) {
      return NextResponse.json({ error: "You are already a team member" }, { status: 400 });
    }

    // Check if there's already a pending request
    const { data: existingRequest } = await supabase
      .from("project_join_requests")
      .select("id")
      .eq("project_id", projectId)
      .eq("user_id", userId)
      .eq("status", "pending")
      .single();

    if (existingRequest) {
      return NextResponse.json({ error: "You already have a pending request" }, { status: 400 });
    }

    // Create join request
    const { data, error } = await supabase
      .from("project_join_requests")
      .insert([
        {
          project_id: projectId,
          user_id: userId,
          message: message || "",
          status: "pending",
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating join request:", error);
      return NextResponse.json({ error: "Failed to create join request" }, { status: 500 });
    }

    // Create notification for project owner
    await supabase.from("notifications").insert([
      {
        user_id: project.author_id,
        type: "join_request",
        message: `New join request for project "${project.title}"`,
        related_id: data.id,
        read: false,
        created_at: new Date().toISOString()
      }
    ]);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST join request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update a join request (approve/reject)
export async function PATCH(request: NextRequest, { params }: Context) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: projectId } = await params;
    const body = await request.json();
    const { requestId, status, role } = body; // status: "approved" or "rejected"

    if (!requestId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user is project owner
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("author_id, title")
      .eq("id", projectId)
      .single();

    if (projectError) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.author_id !== userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    // Update the join request status
    const { data: updatedRequest, error: updateError } = await supabase
      .from("project_join_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", requestId)
      .eq("project_id", projectId)
      .select(`
        id,
        user_id,
        status
      `)
      .single();

    if (updateError) {
      console.error("Error updating join request:", updateError);
      return NextResponse.json({ error: "Failed to update join request" }, { status: 500 });
    }

    // If approved, add user to project team
    if (status === "approved") {
      const { error: memberError } = await supabase
        .from("project_members")
        .insert([
          {
            project_id: projectId,
            user_id: updatedRequest.user_id,
            role: role || "Contributor",
            status: "accepted",
            joined_at: new Date().toISOString()
          }
        ]);

      if (memberError) {
        console.error("Error adding user to project team:", memberError);
        // We don't return an error here because the join request was already approved
      }

      // Create notification for the user
      await supabase.from("notifications").insert([
        {
          user_id: updatedRequest.user_id,
          type: "join_request_approved",
          message: `Your join request for project "${project.title}" has been approved`,
          related_id: requestId,
          read: false,
          created_at: new Date().toISOString()
        }
      ]);
    } else if (status === "rejected") {
      // Create notification for the user
      await supabase.from("notifications").insert([
        {
          user_id: updatedRequest.user_id,
          type: "join_request_rejected",
          message: `Your join request for project "${project.title}" has been rejected`,
          related_id: requestId,
          read: false,
          created_at: new Date().toISOString()
        }
      ]);
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error in PATCH join request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete a join request (withdraw request)
export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id: projectId } = await params;
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("requestId");

    if (!requestId) {
      return NextResponse.json({ error: "Missing requestId parameter" }, { status: 400 });
    }

    // Check if user owns this request or is project owner
    const { data: joinRequest, error: requestError } = await supabase
      .from("project_join_requests")
      .select("user_id")
      .eq("id", requestId)
      .eq("project_id", projectId)
      .single();

    if (requestError) {
      return NextResponse.json({ error: "Join request not found" }, { status: 404 });
    }

    if (joinRequest.user_id !== userId) {
      // Check if user is project owner
      const { data: project } = await supabase
        .from("projects")
        .select("author_id")
        .eq("id", projectId)
        .single();

      if (!project || project.author_id !== userId) {
        return NextResponse.json({ error: "Not authorized" }, { status: 403 });
      }
    }

    // Delete the join request
    const { error } = await supabase
      .from("project_join_requests")
      .delete()
      .eq("id", requestId);

    if (error) {
      console.error("Error deleting join request:", error);
      return NextResponse.json({ error: "Failed to delete join request" }, { status: 500 });
    }

    return NextResponse.json({ message: "Join request deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE join request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}