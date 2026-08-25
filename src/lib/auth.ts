import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// Fail closed: never fall back to a committed/default signing secret. A weak or
// absent secret means anyone can forge an admin JWT, so we refuse to run without
// a strong AUTH_SECRET rather than silently signing with a known value.
const AUTH_SECRET: string = (() => {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET is missing or too weak (must be set to a random string of at least 32 characters)."
    );
  }
  return secret;
})();

export interface AdminUser {
  username: string;
  role: "owner" | "manager" | "frontdesk";
}

export interface JWTPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(user: AdminUser): string {
  return jwt.sign(
    { username: user.username, role: user.role },
    AUTH_SECRET,
    { expiresIn: "24h" }
  );
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, AUTH_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return request.cookies.get("admin_token")?.value || null;
}

export function authenticateRequest(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
