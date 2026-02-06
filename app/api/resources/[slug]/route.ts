import { db } from "@/db/db";
import { resources } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await params;

  const rows = await db
    .select()
    .from(resources)
    .where(eq(resources.slug, slug))
    .limit(1);

  const resource = rows[0] ?? null;

  if (!resource) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(resource);
}
