import { db } from "@/db/db";
import { research } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const all = await db.select().from(research).orderBy(asc(research.order));
    return NextResponse.json({ research: all });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ research: [], error: "Failed to get research" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, title, slug, category, bio, content, references, isPublished, order } = body;

    const [newItem] = await db.insert(research).values({ date, title, slug, category, bio, content, references, isPublished, order: Number(order ?? 0) }).returning();
    return NextResponse.json({ research: newItem }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("id required");

    const body = await request.json();
    const { date, title, slug, category, bio, content, references, isPublished, order } = body;

    const setObj: any = { date, title, slug, category, bio, content, references, isPublished };
    if (order !== undefined) setObj.order = Number(order);

    const [updated] = await db.update(research).set(setObj).where(eq(research.id, id)).returning();
    return NextResponse.json({ research: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("id required");

    await db.delete(research).where(eq(research.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
