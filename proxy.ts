import { NextRequest, NextResponse } from "next/server";

// Presence-only check: is a "token" cookie set. Decoding it for user info
// (payload.email etc.) is lib/auth.ts's job, run inside Server Components,
// not here.
export default function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token) {
    // Redirect to the landing page with ?restricted=true so app/page.tsx renders
    // the "access restricted" message next to the login form.
    return NextResponse.redirect(new URL("/?restricted=true", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/devices", "/books", "/textbooks", "/settings"],
};
