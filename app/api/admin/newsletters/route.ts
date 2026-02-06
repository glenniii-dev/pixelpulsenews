import { db } from "@/db/db";
import { newsletters } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const all = await db
      .select()
      .from(newsletters)
      .orderBy(asc(newsletters.order));

    return NextResponse.json({ newsletters: all });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { newsletters: [], error: "Failed to get newsletters" },
      { status: 500 }
    );
  }
}

/* ---- POST (create) ---- */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, title, slug, edition, content, bibliography, isPublished, order } = body;

    const [newNl] = await db
      .insert(newsletters)
      .values({
        date,
        title,
        slug,
        edition,
        content,
        bibliography,
        isPublished: isPublished ?? false,
        order: order ?? "0",
      })
      .returning();

    return NextResponse.json({ newsletter: newNl }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

/* ---- PUT (update) ---- */
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("id required");

    const body = await request.json();
    const { date, title, slug, edition, content, bibliography, isPublished, order } = body;

    const setObj: any = { date, title, slug, edition, content, bibliography, isPublished };
    if (order !== undefined) setObj.order = order;

    const [updated] = await db
      .update(newsletters)
      .set(setObj)
      .where(eq(newsletters.id, id))
      .returning();

    return NextResponse.json({ newsletter: updated });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

/* ---- DELETE ---- */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("id required");

    await db.delete(newsletters).where(eq(newsletters.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}