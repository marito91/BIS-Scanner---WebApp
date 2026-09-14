// Server-only module: reads the httpOnly "token" cookie via next/headers.
// Do not import this from a Client Component — `cookies()` only works in
// Server Components, Route Handlers, and Server Actions.

import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

// components/Devices.tsx declares its own `LoggedUser` interface ({ first, last })
// for the same JWT payload, but it isn't exported and that file is off-limits to
// edit here, so it can't be imported cleanly. Redeclared below with the `email`
// field this module also needs.
export interface SessionUser {
  first: string;
  last: string;
  email: string;
  userType: string;
}

async function readToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
}

// Mirrors the trust model of src/authentication/auth.js: the JWT signature is
// never verified, only its payload is decoded. We're relocating where that
// check runs (server instead of client), not changing the security boundary.
export async function getSessionUser(): Promise<SessionUser | null> {
  const token = await readToken();
  if (!token) {
    return null;
  }

  try {
    const payload = jwtDecode<SessionUser>(token);
    if (!payload.email) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await readToken();
  if (!token) {
    return false;
  }

  try {
    const payload = jwtDecode<{ email?: string }>(token);
    return Boolean(payload.email);
  } catch {
    return false;
  }
}
