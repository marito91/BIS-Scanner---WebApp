import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HamburgerMenu({ logout }) {
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
          <Link to="/Home" onClick={() => setShowLinks(false)}>
            Dashboard
          </Link>
          <Link to="/devices" onClick={() => setShowLinks(false)}>
            Devices
          </Link>
          <Link to="/books" onClick={() => setShowLinks(false)}>
            Books
          </Link>
          <Link to="/textbooks" onClick={() => setShowLinks(false)}>
            Textbooks
          </Link>
          <Link to="/Home" onClick={() => setShowLinks(false)}>
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
