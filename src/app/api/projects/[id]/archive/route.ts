import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
}