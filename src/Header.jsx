import React from "react";

import logo from "./logo.png";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <h1 id="title">Knowledge Centre & TICs Devices</h1>
    </div>
  );
}
