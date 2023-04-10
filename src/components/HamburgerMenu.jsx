import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HamburgerMenu({ logout }) {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="hamburger-menu">
      {/* Hamburger icon */}
      <div className="hamburger-icon" onClick={() => setShowLinks(!showLinks)}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Links */}
      {showLinks && (
        <div className="links">
          <Link to="/Home" onClick={() => setShowLinks(!showLinks)}>
            Home
          </Link>
          <Link to="/books" onClick={() => setShowLinks(!showLinks)}>
            Books
          </Link>
          <Link to="/devices" onClick={() => setShowLinks(!showLinks)}>
            Devices
          </Link>
          <a href="#logout" onClick={() => logout()}>
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
