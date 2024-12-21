import { NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("doctor-documents")
    .upload(fileName, fileBuffer, {
      contentType: file.type,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("doctor-documents").getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
