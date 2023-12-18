import React from "react";
// import { Link } from "react-router-dom";

import construction from "../assets/under-construction.svg";
export default function Settings() {
  return (
    <div className="settings settings-section">
      <img src={construction} alt="" />
      <h1>We are sorry...</h1>
      <h2>This page is currently under construction.</h2>
      <h2>Sorry for the inconvenience.</h2>
    </div>
  );
}
