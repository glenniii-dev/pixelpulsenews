import { db } from "@/db/db";
import { research } from "@/db/schema";
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
    .from(research)
    .where(eq(research.slug, slug))
    .limit(1);

  const researchPaper = rows[0] ?? null;

  if (!researchPaper) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(researchPaper);
}
