import { redirect } from "next/navigation";

import { isAuthenticated } from "../lib/auth";
import Index from "../components/Index";
import "../src/styles.css";

// Landing route. Server Component: it reads the session cookie via lib/auth.ts
// and the ?restricted query param, then hands both results to <Index>.
//
// - Authenticated visitors are sent straight to /home (the CRA app rendered the
//   dashboard here; that page is a later migration item).
// - ?restricted=true is set by proxy.ts when an unauthenticated request hits a
//   protected route. Its presence (not its value) drives the restricted message
//   rendered next to the login form.

export default async function Page({ searchParams }: PageProps<"/">) {
  if (await isAuthenticated()) {
    redirect("/home");
  }

  const { restricted } = await searchParams;

  return <Index restricted={restricted !== undefined} />;
}
