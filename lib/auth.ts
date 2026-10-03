import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export async function hasAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("fellowship_session")?.value;
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "fallback_temporary_development_secret_key",
    );
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
