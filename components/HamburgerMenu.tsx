"use client";

import { useState } from "react";
import Link from "next/link";

// Migrated from src/components/HamburgerMenu.jsx. Only change: react-router-dom
// <Link to> -> next/link <Link href>. The existing href values (including the
// "/Home" casing used for Dashboard and Settings) are carried over verbatim.

export default function HamburgerMenu({ logout }: { logout: () => void }) {
  const [showLinks, setShowLinks] = useState(false);

  const closeMenuAndLogout = () => {
    setShowLinks(false);
    logout();
  };

  return (
    <>
      <input id="toggle" type="checkbox" checked={showLinks}></input>

      <label
        htmlFor="toggle"
        className={`hamburger ${showLinks ? "active" : ""}`}
        onClick={() => setShowLinks(!showLinks)}
      >
        <div className="top-bun"></div>
        <div className="meat"></div>
        <div className="bottom-bun"></div>
      </label>

      {showLinks && (
        <div className="links">
          <Link href="/home" onClick={() => setShowLinks(false)}>
            Dashboard
          </Link>
          <Link href="/devices" onClick={() => setShowLinks(false)}>
            Devices
          </Link>
          <Link href="/books" onClick={() => setShowLinks(false)}>
            Books
          </Link>
          <Link href="/textbooks" onClick={() => setShowLinks(false)}>
            Textbooks
          </Link>
          <Link href="/settings" onClick={() => setShowLinks(false)}>
            Settings
          </Link>
          <a href="#logout" onClick={closeMenuAndLogout}>
            Logout
          </a>
        </div>
      )}
    </>
  );
}
