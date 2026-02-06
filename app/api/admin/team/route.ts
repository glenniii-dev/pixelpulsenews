import { db } from "@/db/db";
import { team } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const all = await db.select().from(team).orderBy(desc(team.createdAt));
    return NextResponse.json({ team: all });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ team: [], error: "Failed to get team" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, name, role, bio, order } = body;

    const [newItem] = await db.insert(team).values({ image, name, role, bio, order: order ?? "0" }).returning();
    return NextResponse.json({ member: newItem }, { status: 201 });
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
    const { image, name, role, bio, order } = body;

    const [updated] = await db.update(team).set({ image, name, role, bio, ...(order !== undefined && { order }) }).where(eq(team.id, id)).returning();
    revalidatePath("/");
    return NextResponse.json({ member: updated });
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

    await db.delete(team).where(eq(team.id, id));
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
