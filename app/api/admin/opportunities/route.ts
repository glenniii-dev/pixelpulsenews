import { db } from "@/db/db";
import { opportunities } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const all = await db
      .select()
      .from(opportunities)
      .orderBy(asc(opportunities.order));

    return NextResponse.json({ opportunities: all });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { opportunities: [], error: "Failed to get opportunities" },
      { status: 500 }
    );
  }
}

/* ---- POST (create) ---- */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, date, location, isPublished, order } = body;

    const [newOpp] = await db
      .insert(opportunities)
      .values({
        name,
        description,
        date,
        location,
        isPublished: isPublished ?? false,
        order: order ?? "0",
      })
      .returning();

    return NextResponse.json({ opportunity: newOpp }, { status: 201 });
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
    const { name, description, date, location, isPublished, order } = body;

    const setObj: any = { name, description, date, location, isPublished };
    if (order !== undefined) setObj.order = order;

    const [updated] = await db
      .update(opportunities)
      .set(setObj)
      .where(eq(opportunities.id, id))
      .returning();

    return NextResponse.json({ opportunity: updated });
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

    await db.delete(opportunities).where(eq(opportunities.id, id));

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
