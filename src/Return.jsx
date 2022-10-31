import React from "react";

export default function Return({
  userInfo,
  returnDevice,
  searchDevice,
  handleChange,
  goBack,
}) {
  return (
    <>
      <div className="index">
        <div className="options">
          <h2>Ingrese el tipo de dispositivo y su respectivo número:</h2>
          <div className="returns">
            <div className="device">
              <label htmlFor="">
                Seleccione el tipo de dispositivo a regresar:
              </label>
              <select
                name="device"
                onChange={handleChange}
                value={userInfo.device}
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
                value={userInfo.number}
                type="text"
                placeholder="01, 16, 28, etc..."
                onChange={handleChange}
                required
              ></input>
            </div>
          </div>
          <div className="returnBtn">
            <button onClick={() => returnDevice()}>Devolver dispositivo</button>
            <button onClick={() => searchDevice()}>Buscar dispositivo</button>
            <button onClick={() => goBack()}>Atrás</button>
          </div>
        </div>
      </div>
    </>
  );
}
