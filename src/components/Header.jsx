import React from "react";

import logo from "../assets/logo.png";

export default function Header({ goBack, toggleSection, testConnection }) {
  return (
    <div className="header">
      <img src={logo} alt="" />
      <h1 id="title" onClick={() => goBack()}>
        Knowledge Centre & TICs Devices
      </h1>
      <div>
        {/* <label onClick={() => toggleSection("scanner")} htmlFor="">
          Alquiler
        </label>
        <label onClick={() => toggleSection("back")} htmlFor="">
          Devolución
        </label>
        <label onClick={() => toggleSection("download")} htmlFor="">
          Registros
        </label> */}
        <label onClick={() => testConnection()} htmlFor="">
          Conexión
        </label>
      </div>
    </div>
  );
}
