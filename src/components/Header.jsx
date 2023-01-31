import React from "react";

import logo from "../assets/logo.png";
import { auth } from "../authentication/auth";

import { Link } from "react-router-dom";

export default function Header({ logout }) {
  return (
    <>
      {auth() ? (
        <>
          <div className="header">
            <img src={logo} alt="" />
            <div className="header-right">
              <Link to="/home">Home</Link>
              <Link to="/devices">Devices</Link>
              <Link to="/books">Books</Link>
              <a href="#logout" onClick={logout}>
                Logout
              </a>
            </div>
          </div>
          <img className="mobile-img" src={logo} alt="" />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
