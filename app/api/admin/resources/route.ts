import { db } from "@/db/db";
import { resources } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const all = await db.select().from(resources).orderBy(asc(resources.order));
    return NextResponse.json({ resources: all });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ resources: [], error: "Failed to get resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, order, isPublished } = body;

    const [newItem] = await db
      .insert(resources)
      .values({ title, slug, content, order: Number(order ?? 0), isPublished: isPublished ?? false })
      .returning();
    
    revalidatePath("/admin/dashboard");
    return NextResponse.json({ resource: newItem }, { status: 201 });
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
    const { title, slug, content, order, isPublished } = body;

    const setObj: any = { title, slug, content };
    if (order !== undefined) setObj.order = Number(order);
    if (isPublished !== undefined) setObj.isPublished = isPublished;

    const [updated] = await db.update(resources).set(setObj).where(eq(resources.id, id)).returning();
    revalidatePath("/admin/dashboard");
    return NextResponse.json({ resource: updated });
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

    await db.delete(resources).where(eq(resources.id, id));
    revalidatePath("/admin/dashboard");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
