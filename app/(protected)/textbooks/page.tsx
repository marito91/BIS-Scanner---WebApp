import { redirect } from "next/navigation";

import { getSessionUser } from "../../../lib/auth";
import Textbooks from "../../../components/Textbooks";

// Protected route, gated twice: proxy.ts only checks that the "token" cookie
// is present, not that it decodes validly, so a present-but-invalid cookie
// reaches this page. getSessionUser() does the real decode here and this
// Server Component redirects on null — same ?restricted=true target proxy.ts
// uses for the unauthenticated case.

export default async function Page() {
  const loggedUser = await getSessionUser();
  if (!loggedUser) {
    redirect("/?restricted=true");
  }

  return <Textbooks loggedUser={loggedUser} />;
}
