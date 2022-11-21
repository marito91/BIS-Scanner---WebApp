import React from "react";

import arrow from "./arrow.png";

export default function Index({
  toggleSection,
  testConnection,
  rented,
  updateRented,
}) {
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
        <div className="group">
          <button onClick={() => testConnection()}>Probar conexión</button>
          <img src={arrow} alt="" />
          <h3>Prueba si hay una conexión activa con la base de datos.</h3>
        </div>
      </div>
      <div className="options">
        <h2>Dispositivos rentados actualmente:</h2>
        <div className="table-container devices-list">
          <table>
            <tr>
              <th id="noncrucial">Sección</th>
              <th>Nombres</th>
              <th>Apellido</th>
              <th id="noncrucial">Documento</th>
              <th>Fecha</th>
              <th id="noncrucial">Hora</th>
              <th>Dispositivo</th>
              <th>Número</th>
            </tr>
            {rented.map((entry) => (
              <>
                <tr>
                  <td id="noncrucial" key={entry.grade}>
                    {entry.grade}
                  </td>
                  <td key={entry.firstName}>{entry.firstName}</td>
                  <td key={entry.lastName}>{entry.lastName}</td>
                  <td id="noncrucial" key={entry.code}>
                    {entry.code}
                  </td>
                  <td key={entry.date}>{entry.date}</td>
                  <td id="noncrucial" key={entry.time}>
                    {entry.time}
                  </td>
                  <td key={entry.device}>{entry.device}</td>
                  <td key={entry.number}>{entry.number}</td>
                </tr>
              </>
            ))}
          </table>
        </div>
        <button
          style={{ margin: "auto", marginBottom: "2%", marginTop: "2%" }}
          onClick={() => updateRented()}
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}
