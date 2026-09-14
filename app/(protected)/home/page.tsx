import { redirect } from "next/navigation";

import { getSessionUser } from "../../../lib/auth";
import construction from "@/assets/under-construction.svg";

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

  return (
    <div style={{ padding: "1rem" }} className="dashboard-section">
      <h1>Welcome, {loggedUser.first}</h1>
      <h2>
        Please head on to either the{" "}
        <strong style={{ color: "red" }}>Devices</strong>, the{" "}
        <strong style={{ color: "red" }}>Books</strong> or the{" "}
        <strong style={{ color: "red" }}>Textbooks</strong> section.
      </h2>
      <div className="settings settings-section">
        <img src={construction.src} alt="" />
        <h1>We are sorry...</h1>
        <h2>This page is currently under construction.</h2>
        <h2>Sorry for the inconvenience.</h2>
      </div>
      {loggedUser.userType !== "admin" ? (
        <h1>
          This is your first time using this app. I am so glad to have you here!
        </h1>
      ) : null}
    </div>
  );
}
