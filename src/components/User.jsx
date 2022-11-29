import React from "react";

import back from "../assets/back.png";
import email from "../assets/email.png";

export default function User({ user, notify, returnDevice }) {
  const device = user.device + " #" + user.number;
  const date = user.date + " a las " + user.time;
  return (
    <div className="list">
      <h3 htmlFor="">Nombre:</h3>
      <label htmlFor="">{user.name}</label>
      <h3 htmlFor="">Sección:</h3>
      <label htmlFor="">{user.section}</label>
      <h3 htmlFor="">Dispositivo:</h3>
      <label htmlFor="">{user.name === "" ? "" : device}</label>
      <h3 htmlFor="">Fecha de alquiler:</h3>
      <label htmlFor="">{user.name === "" ? "" : date}</label>
      <br />
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button onClick={() => returnDevice([user.device, user.number])}>
          Devolver
          <img src={back} alt="" />
        </button>
        <button onClick={() => notify(user)}>
          Notificar
          <img src={email} alt="" />
        </button>
      </div>
    </div>
  );
}
