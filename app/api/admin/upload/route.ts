import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buf = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const contentType = file.type || "application/octet-stream";

    const url = await uploadToR2(filename, buf, contentType);

    return NextResponse.json({ url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
