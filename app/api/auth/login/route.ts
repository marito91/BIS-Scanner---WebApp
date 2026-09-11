import { NextRequest, NextResponse } from "next/server";
import jwtDecode from "jwt-decode";

import HOSTBASE from "../../../../lib/hostbase";

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Same trust model as the JWT everywhere else in this app: the token is
// decoded only to read its `exp` claim for the cookie's maxAge, never
// signature-verified.
function maxAgeFromToken(token: string): number {
  try {
    const payload = jwtDecode<{ exp?: number }>(token);
    if (payload.exp) {
      const secondsUntilExpiry = payload.exp - Math.floor(Date.now() / 1000);
      if (secondsUntilExpiry > 0) {
        return secondsUntilExpiry;
      }
    }
  } catch {
    // fall through to default
  }
  return DEFAULT_MAX_AGE_SECONDS;
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const upstreamResponse = await fetch(`${HOSTBASE}/users/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ localUser: { username, password } }),
  });
  const data = await upstreamResponse.json();

  if (data.status !== "ok") {
    return NextResponse.json(
      { status: data.status, msg: data.msg },
      { status: upstreamResponse.status }
    );
  }

  const response = NextResponse.json({ status: "ok" });
  response.cookies.set("token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeFromToken(data.token),
  });
  return response;
}
