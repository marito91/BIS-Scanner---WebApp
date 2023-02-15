import React from "react";
import { Link } from "react-router-dom";

import forbid from "../assets/forbid.svg";

// This component only appears when a user is trying to access a section inside the application but doesn't have the right authentication and token stored in the localStorage.
export default function Restricted() {
  return (
    <div className="restricted">
      <img src={forbid} alt="" />
      <h1>We are sorry...</h1>
      <h2>The page you are trying to access is restricted.</h2>
      <h2> Please refer to your system administrator.</h2>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}
