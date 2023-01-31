import React from "react";
import hostbase from "../../hostbase.js";

import User from "../devices/User.jsx";

import ipad from "../../assets/ipad.png";
import chromebook from "../../assets/chromebook.png";

export default function Actives({
  setUser,
  rented,
  notify,
  active,
  setActive,
  entries,
  updateRented,
}) {
  // Esta función permite desplegar la información pertinente del usuario seleccionado. Se pasa el objeto seleccionado de la tabla de rented y asigna la información de este al objeto User con el fin de mostrar cada uno de los datos del objeto.
  const selectUser = function (user) {
    const fname = user.firstName.split(" ");
    setActive({
      name: fname[0] + " " + user.lastName,
      section: user.grade,
      device: user.device,
      number: user.number,
      date: user.date,
      time: user.time,
      email: user.email,
    });
  };

  // Esta función se encarga de la devolución de dispositivos. Esta recibe una String que indica el dispositivo que se va a devolver. Realiza el envío de la información al backend con las respectivas validaciones.
  function returnDevice(deviceNumber) {
    // Se separa el String para obtener el tipo de dispositivo y el número.
    const device = deviceNumber[0];
    const number = deviceNumber[1];
    const confirm = window.confirm(
      `Are you sure the ${device} #${number} is being returned?`
    );
    // Se comunica con backend y envía la información
    if (confirm) {
      fetch(`${hostbase}/devices/return`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ device, number }),
      })
        .then((res) => res.json())
        .then((res) => {
          // Indica si se pudo realizar la devolución o no
          alert(
            `The device was rented with the following observations: ${res.conditions}`
          );
          alert(res.msg);
          // Se refresca la lista de rentados
          updateRented();
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
      // Se refresca la lista de rentados
      updateRented();
    }
  }

  function capitalizeName(name) {
    const names = name.split(" ");
    const namesUpper = [];

    for (const n of names) {
      namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    return namesUpper.join(" ");
  }

  function arrangeName(strFirst, strLast) {
    const first = strFirst.toLowerCase().split(" ")[0];
    const last = strLast.toLowerCase().split(" ")[0];
    return capitalizeName(first + " " + last);
  }

  return (
    <div className="active-users">
      <h1>Active Users</h1>
      <button id="notification-btn" onClick={() => notify()}>
        Send Notification
      </button>
      <div className="active-users-info">
        <div className="stats-1">
          <label id="stat">{rented.length}</label>
          <label>Devices rented!</label>
        </div>
        <div className="stats-2">
          <label id="stat">{entries.length}</label>
          <label>Rents so far!</label>
        </div>
        <div className="users">
          {rented.map((entry, index) => (
            <div
              className="user-entry"
              onClick={() => selectUser(entry)}
              key={index}
            >
              <div>
                <img
                  src={
                    entry.device.toLowerCase() === "chromebook"
                      ? chromebook
                      : ipad
                  }
                  alt=""
                />
              </div>
              <label>{arrangeName(entry.firstName, entry.lastName)}</label>
            </div>
          ))}
        </div>
        <User active={active} notify={notify} returnDevice={returnDevice} />
      </div>
    </div>
  );
}
