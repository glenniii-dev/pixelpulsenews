import { db } from "@/db/db";
import { articles } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const all = await db
      .select()
      .from(articles)
      .orderBy(asc(articles.order));

    return NextResponse.json({ articles: all });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { articles: [], error: "Failed to get articles" },
      { status: 500 }
    );
  }
}

/* ---- POST (create) ---- */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, title, slug, submittedTo, content, author, bibliography, isPublished, order } = body;

    const [newNl] = await db
      .insert(articles)
      .values({
        date,
        title,
        slug,
        submittedTo,
        content,
        author,
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
    const { date, title, slug, submittedTo, content, author, bibliography, isPublished, order } = body;

    const setObj: any = { date, title, slug, submittedTo, content, author, bibliography, isPublished };
    if (order !== undefined) setObj.order = order;

    const [updated] = await db
      .update(articles)
      .set(setObj)
      .where(eq(articles.id, id))
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

    await db.delete(articles).where(eq(articles.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
