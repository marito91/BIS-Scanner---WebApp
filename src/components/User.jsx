import React from "react";

import back from "../assets/back.png";
import email from "../assets/email.png";

export default function User({ notify, returnDevice, active }) {
  const device = active.device + " #" + active.number;
  const date = active.date + " a las " + active.time;
  return (
    <div className="list">
      <h3 htmlFor="">Nombre:</h3>
      <label htmlFor="">{active.name}</label>
      <h3 htmlFor="">Sección:</h3>
      <label htmlFor="">{active.section}</label>
      <h3 htmlFor="">Dispositivo:</h3>
      <label htmlFor="">{active.name === "" ? "" : device}</label>
      <h3 htmlFor="">Fecha de alquiler:</h3>
      <label htmlFor="">{active.name === "" ? "" : date}</label>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "2%",
        }}
      >
        <button onClick={() => returnDevice([active.device, active.number])}>
          Devolver
          <img src={back} alt="" />
        </button>
        <button onClick={() => notify(active)}>
          Notificar
          <img src={email} alt="" />
        </button>
      </div>
    </div>
  );
}
