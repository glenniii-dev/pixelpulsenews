import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { admin } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const admins = await db.select().from(admin).where(eq(admin.username, username));
    const adminUser = admins[0];

    if (!adminUser || !(await compare(password, adminUser.password))) {
      return NextResponse.json(
        { success: false, error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const token = sign(
      { id: adminUser.id, username: adminUser.username }, JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      success: true,
      admin: {
        id: adminUser.id,
        username: adminUser.username,
      },
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    });

    return response; 
  } catch (error) {
    console.error("Error logging admin:", error);
    return NextResponse.json(
      { success: false, error: "Failed to login admin" },
      { status: 500 }
    );
  }
}