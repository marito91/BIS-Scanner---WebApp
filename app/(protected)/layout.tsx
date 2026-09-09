"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../src/styles.css";

// Shared shell for the protected routes (/home, /devices, /books, /textbooks,
// /settings — pages migrated separately). Mirrors src/App.js's shell: Menu,
// the page, Footer, and a ToastContainer.
//
// This is a Client Component because the whole shell is interactive (Menu's
// selection state, the hamburger toggle, react-toastify) and none of it needs
// server-side session data — Menu and Footer displayed no user info in the CRA
// app, and access is already gated by proxy.ts, so there is no auth check to
// reproduce here. `children` stays a Server Component: it is passed through as
// a prop slot, not imported into this module's client graph.

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Was App.js's logout(): removed the localStorage token and hard-reloaded to
  // "/". The token is now an httpOnly cookie, so clearing it means POSTing to
  // the logout route handler; the redirect is a client-side navigation.
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <Menu logout={logout} />
      {children}
      <Footer logout={logout} />
      <ToastContainer position="top-right" autoClose={4000} pauseOnHover />
    </>
  );
}
