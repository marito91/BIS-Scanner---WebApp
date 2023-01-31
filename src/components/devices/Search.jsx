import React from "react";
import hostbase from "../../hostbase.js";

import search from "../../assets/search.png";

export default function Search({ handleSearch, searchInfo, setSearchInfo }) {
  // Esta función se encarga de la búsqueda de dispositivos con el fin de encontrar si un dispositivo se encuentra en uso y por quién.
  function searchDevice() {
    // Si no se especifica el tipo de dispositivo entonces arroja un mensaje para que ingrese uno válido
    if (searchInfo.device === "" || searchInfo.device === "- Device -") {
      alert("Por favor ingrese un tipo de dispositivo.");
    } else {
      // No acepta el número del dispositivo si es mayor a 30 o si es menor o igual a 0.
      if (searchInfo.number > 30 || searchInfo.number <= 0) {
        alert("Please enter a valid number between 1 and 30.");
        setSearchInfo({
          document: "",
          date: "",
          filter: "",
          device: "",
          number: "",
        });
      } else {
        fetch(`${hostbase}/devices/search`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ searchInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            alert(res.msg);
            // Se refresca la lista de rentados
            // updateRented();
          })
          // Si hay error de conexión se envía una alerta
          .catch(function () {
            alert(
              "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
            );
          });
        // Se restauran a string en blanco los valores del objeto user
        setSearchInfo({
          document: "",
          date: "",
          filter: "",
          device: "",
          number: "",
        });
      }
    }
  }
  return (
    <div className="search-module">
      <h2>Search Device</h2>
      <div className="modules-forms">
        <label>Device</label>
        <select
          name="device"
          onChange={handleSearch}
          value={searchInfo.device}
          required
        >
          <option>- Device -</option>
          <option>ChromeBook</option>
          <option>iPad</option>
        </select>
        <label>Number</label>
        <input
          name="number"
          value={searchInfo.number}
          type="number"
          placeholder="1, 16, 28, etc..."
          onChange={handleSearch}
          required
        ></input>
      </div>
      <div className="modules-btns">
        <button onClick={() => searchDevice()}>Search</button>
        <img src={search} alt="" onClick={() => searchDevice()} />
      </div>
    </div>
  );
}
