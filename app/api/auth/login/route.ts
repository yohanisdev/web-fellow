import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function POST(request: NextRequest) {
  try {
    // 1. Extract credentials safely from the incoming request body
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required fields." },
        { status: 400 }
      );
    }

    // 2. Look up the administrator account in the PostgreSQL database
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    // 3. Security Guard: If user doesn't exist, generic failure response
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email address or security password." },
        { status: 401 }
      );
    }

    // 4. Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email address or security password." },
        { status: 401 }
      );
    }

    // 5. Generate a secure, signed JWT token string using jose
    const secretKey = new TextEncoder().encode(
      process.env.JWT_SECRET || "fallback_temporary_development_secret_key"
    );

    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h") // Token expires in 2 hours
      .sign(secretKey);

    // 6. Pack token into a highly secure HTTP-Only cookie container
    const response = NextResponse.json(
      { success: true, message: "Authentication authorized successfully." },
      { status: 200 }
    );

    response.cookies.set({
      name: "fellowship_session",
      value: token,
      httpOnly: true, // Prevents client-side scripts from reading token data
      secure: process.env.NODE_ENV === "production", // Forces HTTPS in production
      sameSite: "strict", // Curbs CSRF request forgery vectors
      maxAge: 60 * 60 * 2, // Matches the token lifecycle window (2 hours)
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Authentication internal engine fault:", error);
    return NextResponse.json(
      { error: "An unexpected internal server error occurred." },
      { status: 500 }
    );
  }
}