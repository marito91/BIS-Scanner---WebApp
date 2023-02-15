import React from "react";
import hostbase from "../../hostbase.js";

// import Barcode from "../Barcode.jsx";

import scanner from "../../assets/scanner.png";

export default function Rent({
  user,
  setUser,
  setActive,
  updateRented,
  entryCount,
}) {
  // Función que determina los valores que se asignan dentro del objeto User. Dispositivo y número. Se utiliza cuando se va a alquilar un dispositivo.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };

  // Función que asigna el código de barra leído a la llave (document) del objeto User. Cuando el usuario registra el código de barra leído, esta función se encarga de asignar el código leído dentro a la llave document del objeto User.
  // const handleCode = (code) => {
  //   setUser((user) => ({ ...user, document: code }));
  // };

  // Esta función se encarga de realizar el envío de la información respectiva a los alquileres al backend con las respectivas validaciones.
  function rent() {
    // Si la llave (document) del objeto user es diferente a un documento válido entonces alerta que se asigne un documento correcto.
    if (user.document === "----------" || user.document === "") {
      alert("Please enter a valid Barcode");
    } else {
      // No acepta el número del dispositivo si es mayor a 30 o si es menor o igual a 0 dado que no se cuenta con esos dispositivos en biblioteca.
      if (user.number > 30 || user.number <= 0) {
        alert("Please enter a valid number between 1 and 30.");
        // Si todas las validaciones se hacen entonces se comunica con el servidor back y envía la información correspondiente, es decir, el objeto User.
      } else {
        fetch(`${hostbase}/devices/rent`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ user }),
        })
          .then((res) => res.json())
          .then((res) => {
            // Indica si se pudo o no realizar el alquiler. Existen otras validaciones en backend
            alert(res.msg);
            // Se refresca la lista de rentados
            updateRented();
            entryCount();
            window.location.href = "/devices";
          })
          // Si hay error de conexión se envía una alerta
          .catch(function () {
            alert(
              "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
            );
          });
        // Se restauran a string en blanco los valores del objeto user
        setUser({
          document: "",
          device: "",
          number: "",
          name: "",
          section: "",
          date: "",
          time: "",
          email: "",
          comments: "",
        });
        setActive({
          document: "",
          device: "",
          number: "",
          name: "",
          section: "",
          date: "",
          time: "",
          email: "",
        });
      }
    }
  }

  return (
    <div className="rent-module">
      <h2 style={{ color: "#172140" }}>Rent Device</h2>
      <div className="modules-forms">
        {/* <Barcode handleCode={handleCode} user={user} /> */}
        <label>Document</label>
        <input
          name="document"
          value={user.document}
          type="text"
          placeholder="Student or teacher document"
          onChange={handleChange}
          required
        ></input>
        <label>Device</label>
        <select
          id="modules-select"
          name="device"
          onChange={handleChange}
          value={user.device}
          required
        >
          <option>- Device -</option>
          <option>ChromeBook</option>
          <option>iPad</option>
        </select>
        <label>Number</label>
        <input
          name="number"
          value={user.number}
          type="text"
          placeholder="1, 16, 28, etc..."
          onChange={handleChange}
          required
        ></input>
        <label>Observations</label>
        <textarea
          name="comments"
          value={user.comments}
          type="text"
          rows={9}
          placeholder="Good conditions or broken screen, small damage, etc."
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="modules-btns">
        <button onClick={() => rent()}>Rent</button>
        <img src={scanner} alt="" onClick={() => rent()} />
      </div>
    </div>
  );
}
