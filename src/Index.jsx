import React from "react";

import arrow from "./arrow.png";

export default function Index({ toggleSection, downloadEntries }) {
  return (
    <div className="index">
      <div className="options">
        <h2>Por favor seleccione una opción:</h2>
        <div className="group">
          <button onClick={() => toggleSection("scanner")}>Alquiler</button>
          <img src={arrow} alt="" />
          <h3>Asigna un dispositivo a un miembro de la comunidad.</h3>
        </div>
        <div className="group">
          <button onClick={() => toggleSection("back")}>Devolución</button>
          <img src={arrow} alt="" />
          <h3>Devuelve dispositivos y registra los cambios.</h3>
        </div>
        <div className="group">
          <button onClick={() => toggleSection("download")}>
            Descargar Registros
          </button>
          <img src={arrow} alt="" />
          <h3>Descarga el historial de registros de la aplicación.</h3>
        </div>
      </div>
    </div>
  );
}
