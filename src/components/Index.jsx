import React from "react";

import User from "./User.jsx";
import Barcode from "./Barcode.jsx";
import refresh from "../assets/refresh.png";
import email from "../assets/email.png";
import tap from "../assets/tap.png";
import search from "../assets/search.png";
import folder from "../assets/folder.png";
import excel from "../assets/excel.png";
import scanner from "../assets/scanner.png";
import testing from "../assets/testing.png";

export default function Index({
  user,
  rent,
  rented,
  updateRented,
  notify,
  returnDevice,
  selectUser,
  searchDevice,
  handleSearch,
  searchInfo,
  history,
  downloadEntries,
  downloadFile,
  testConnection,
  handleCode,
  handleChange,
  active,
}) {
  return (
    <div className="index">
      <div className="options">
        <h2>
          Bienvenid@ al sistema de manejo de dispositivos del Knowledge Centre!
        </h2>
      </div>
      <div className="options">
        <h2>Usuarios Activos</h2>
        <div className="btns">
          <button onClick={() => testConnection("scanner")}>
            Conexión <img src={testing} alt="" />
          </button>
          <button onClick={() => updateRented()}>
            Actualizar <img src={refresh} alt="" />
          </button>
          <button onClick={() => notify()}>
            Recordatorio <img src={email} alt="" />
          </button>
        </div>
        <div className="updates">
          <div className="devices-list">
            <h3>
              Haga click <img src={tap} alt="" /> en el usuario:
            </h3>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {rented.map((entry) => (
                  <>
                    <tr>
                      <td
                        id="selectedUser"
                        key={entry.document}
                        style={{ cursor: "pointer" }}
                        onClick={() => selectUser(entry)}
                      >
                        {`${entry.firstName} ${entry.lastName}`}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <User
            user={user}
            active={active}
            notify={notify}
            returnDevice={returnDevice}
            selectUser={selectUser}
          />
        </div>
      </div>
      <div className="options">
        <h2>Alquiler de dispositivos</h2>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button onClick={() => toggleSection("scanner")}>
            Alquilar <img src={scanner} alt="" />
          </button>
        </div> */}
        <div className="updates">
          <div className="devices-list">
            <h3>
              Escanee el código y asígnelo para poder realizar un registro.
            </h3>
            {/* <label>Código de barra: {data}</label> */}
            <Barcode handleCode={handleCode} />
            <div className="selected">
              <label>Documento seleccionado:</label>
              {user !== null ? (
                <label id="documento">{user.document}</label>
              ) : (
                <></>
              )}
            </div>
            <div className="device-selection">
              <div>
                <label>Seleccione el dispositivo:</label>
                <select
                  name="device"
                  onChange={handleChange}
                  value={user.device}
                  required
                >
                  <option>- Dispositivo -</option>
                  <option>ChromeBook</option>
                  <option>iPad</option>
                </select>
              </div>
              <div>
                <label>Ingrese el número del dispositivo</label>
                <input
                  name="number"
                  value={user.number}
                  type="text"
                  placeholder="01, 16, 28, etc..."
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="returnBtn">
          <button onClick={() => rent()}>
            Alquilar <img src={scanner} alt="" />
          </button>
        </div>
      </div>
      <div className="section-2">
        <div className="options mini-sections">
          <h2>Buscar dispositivo</h2>
          <div className="returns">
            <div className="device">
              <label htmlFor="">Seleccione el tipo de dispositivo:</label>
              <select
                name="device"
                onChange={handleSearch}
                value={searchInfo.device}
                required
              >
                <option>- Dispositivo -</option>
                <option>ChromeBook</option>
                <option>iPad</option>
              </select>
            </div>
            <div className="device">
              <label htmlFor="">Indique el número del dispositivo:</label>
              <input
                name="number"
                value={searchInfo.number}
                type="number"
                placeholder="1, 16, 28, etc..."
                onChange={handleSearch}
                required
              ></input>
            </div>
          </div>
          <div className="returnBtn">
            <button onClick={() => searchDevice()}>
              Buscar <img src={search} alt="" />
            </button>
          </div>
        </div>
        <div className="options mini-sections">
          <h2>Descargar Registros</h2>
          <div className="returns">
            <div className="device">
              <label htmlFor="">Seleccione el fitro que desea usar</label>
              <select
                name="filter"
                onChange={handleSearch}
                value={searchInfo.filter}
                required
              >
                <option>- Filtro -</option>
                <option>Documento</option>
                <option>Fecha</option>
              </select>
            </div>
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
              <label htmlFor="">Indique la fecha deseada:</label>
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
              Cargar Info. <img src={excel} alt="" />
            </button>
            <button onClick={() => downloadFile(history)}>
              Descargar <img src={folder} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
