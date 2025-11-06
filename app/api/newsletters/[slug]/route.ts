// app/api/newsletters/[slug]/route.ts
import { db } from "@/db/db";
import { newsletters } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request, // keep the underscore if you don’t use it
  {
    params,
  }: {
    /** `params` is a Promise in Next.js 16 */
    params: Promise<{ slug: string }>;
  }
) {
  // Await the promise before destructuring
  const { slug } = await params;

  const rows = await db
    .select({
      date: newsletters.date,
      edition: newsletters.edition,
      title: newsletters.title,
      content: newsletters.content,
      isPublished: newsletters.isPublished,
    })
    .from(newsletters)
    .where(eq(newsletters.title, slug)) // you’re using title as slug – see note below
    .limit(1);

  const newsletter = rows[0] ?? null;

  if (!newsletter) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(newsletter);
}