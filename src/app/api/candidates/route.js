import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    // Define write path
    const uploadDir = path.join(process.cwd(), "public", "candidates");
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, src: `/candidates/${filename}` });
  } catch (error) {
    console.error("Error in API route POST /api/candidates:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { src } = await request.json();

    if (!src) {
      return NextResponse.json({ error: "No image source provided" }, { status: 400 });
    }

    const filename = path.basename(src);
    const filePath = path.join(process.cwd(), "public", "candidates", filename);

    try {
      await unlink(filePath);
    } catch (err) {
      console.warn("File already deleted or not found on disk:", filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in API route DELETE /api/candidates:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
