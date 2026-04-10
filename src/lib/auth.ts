import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const AUTH_SECRET = process.env.AUTH_SECRET || "fallback-secret-change-me";

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
