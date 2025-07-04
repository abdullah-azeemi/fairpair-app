import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  console.log("Deleting project with id:", id);
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