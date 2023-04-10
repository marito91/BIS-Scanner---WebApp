import React from "react";
import { auth } from "../authentication/auth";
// import { Link } from "react-router-dom";

// import home from "../assets/home-icon.svg";
// import signout from "../assets/logout-icon.svg";
// import book from "../assets/book-icon.svg";
// import devices from "../assets/devices-icon.svg";
import HamburgerMenu from "./HamburgerMenu";
// import history from "../assets/history-icon.svg";

// The footer component manages the routes to each one of the sections in the app. The user needs to be authenticated in order to be able to have access. This will only display when in mobile.

export default function Footer({ logout }) {
  return (
    <>
      {auth() ? (
        <>
          {/* <div className="footer">
            <Link to="/devices">
              <img src={devices} alt="" />
            </Link>
            <Link to="/books">
              <img src={book} alt="" />
            </Link>
            <Link to="/home">
              <img src={home} alt="" />
            </Link>
            <Link to="/home">
              <img src={signout} alt="" onClick={() => logout()} />
            </Link>
          </div> */}
          <HamburgerMenu logout={logout} />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
