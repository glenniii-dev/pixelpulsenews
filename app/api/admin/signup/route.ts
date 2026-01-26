import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { admin } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

const SECRET_CODE = process.env.ADMIN_SECRET_CODE!;

export async function POST(req: Request) {
  try {
    const { username, password, secretCode } = await req.json();

    // Validate all fields are provided
    if (!username || !password || !secretCode) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify secret code
    if (secretCode !== SECRET_CODE) {
      return NextResponse.json(
        { success: false, error: "Invalid secret code" },
        { status: 401 }
      );
    }

    // Check if username already exists
    const existingAdmins = await db
      .select()
      .from(admin)
      .where(eq(admin.username, username));

    if (existingAdmins.length > 0) {
      return NextResponse.json(
        { success: false, error: "Username already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create new admin user
    const newAdmin = await db
      .insert(admin)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      admin: {
        id: newAdmin[0].id,
        username: newAdmin[0].username,
      },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create account" },
      { status: 500 }
    );
  }
}
