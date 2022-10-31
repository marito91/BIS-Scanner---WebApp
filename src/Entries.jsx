import React from "react";

export default function Entries({
  searchInfo,
  downloadEntries,
  handleSearch,
  goBack,
  history,
  cleanUp,
}) {
  return (
    <>
      <div className="index">
        <div className="options">
          <h2>Seleccione el filtro que desea utilizar:</h2>
          <div className="device">
            <select
              name="filter"
              id="filter"
              onChange={handleSearch}
              value={searchInfo.filter}
              required
            >
              <option>- Filtro -</option>
              <option>Documento</option>
              <option>Fecha</option>
            </select>
          </div>
          <div className="returns">
            <div className="device">
              <label htmlFor="">Indique el documento del usuario:</label>
              <input
                name="document"
                value={searchInfo.document}
                type="text"
                placeholder="Documento del usuario"
                onChange={handleSearch}
              ></input>
            </div>
            <div className="device">
              <label htmlFor="">Indique la fecha que deseada:</label>
              <input
                name="date"
                value={searchInfo.date}
                maxLength="10"
                type="date"
                placeholder="Fecha en formato mm/dd/yyyy"
                onChange={handleSearch}
              ></input>
            </div>
          </div>
          <div className="returnBtn">
            <button onClick={() => downloadEntries()}>
              Desplegar historial
            </button>
            <button onClick={() => cleanUp()}>Limpiar</button>
            <button onClick={() => goBack()}>Atrás</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <tr>
              <th>Sección</th>
              <th>Nombres</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Dispositivo</th>
              <th>Número</th>
              <th>Tipo</th>
            </tr>
            {history.map((entry) => (
              <>
                <tr>
                  <td>{entry.grade}</td>
                  <td>{entry.firstName}</td>
                  <td>{entry.lastName}</td>
                  <td>{entry.code}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.device}</td>
                  <td>{entry.number}</td>
                  <td>{entry.type}</td>
                </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
