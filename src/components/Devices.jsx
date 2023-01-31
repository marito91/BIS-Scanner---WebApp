import React, { useState, useEffect } from "react";
import hostbase from "../hostbase.js";

import Actives from "./devices/Actives.jsx";
import Rent from "./devices/Rent.jsx";
import Search from "./devices/Search.jsx";
import Entries from "./devices/Entries.jsx";
import "../components/devices/devices.css";

export default function Devices({ user, setUser }) {
  // Objeto con la info de búsqueda
  // Con este objeto accedemos a toda la información necesaria para buscar y desplegar registros de bases de datos con relación a historial/dispositivos en renta.
  const [searchInfo, setSearchInfo] = useState({
    document: "",
    date: "",
    filter: "",
    device: "",
    number: "",
  });

  // Objeto con la información del usuario que se muestra en client side, con esto nos evitamos que se alteren diferentes módulos y componentes a través de la aplicación cuando se realice un cambio del objeto user.
  const [active, setActive] = useState({
    document: "",
    device: "",
    number: "",
    name: "",
    section: "",
    date: "",
    time: "",
    email: "",
  });

  // Función que determina los valores que se asignan dentro del objeto SearchInfo. Dispositivo y número. Se utiliza cuando se va a realizar la búsqueda de un dispositivo o cuando se van a descargar registros.
  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchInfo((searchInfo) => ({ ...searchInfo, [name]: value }));
  };

  // Array que contiene toda la informacion de los dispositivos alquilados actualmente. Se actualiza con el botón/función de updateRented()
  const [rented, setRented] = useState([]);

  // Esta tabla se utiliza para contabilizar el historial de alquileres en la aplicacion.
  const [entries, setEntries] = useState([]);

  const entryCount = async () => {
    const response = await fetch(`${hostbase}/devices/rented_all_time`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  useEffect(() => {
    entryCount()
      .then((res) => {
        setEntries(res.data);
      })
      .catch((e) => {
        console.log(e.message);
        alert(
          "En este momento no hay conexión al servidor. Por favor solicitar soporte a SISTEMAS."
        );
      });
  }, []);

  // Función para actualizar la lista de dispositivos rentados actualmente
  const updateRented = async () => {
    const response = await fetch(`${hostbase}/devices/rented`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  useEffect(() => {
    updateRented()
      .then((res) => {
        setRented(res.data);
      })
      .catch((e) => {
        console.log(e.message);
        console.log(
          "En este momento no hay conexión al servidor. Por favor solicitar soporte a SISTEMAS."
        );
      });
  }, []);

  // Funcion para notificar al estudiante seleccionado. Posteriormente se deben unir ambas funciones para mejorar código.
  function notifyOne(user) {
    if (user.email === "") {
      alert("Por favor seleccione un usuario");
    } else {
      const sendMsg = window.confirm(
        `Do you want to send an email notification to ${user.name}?`
      );
      if (sendMsg) {
        fetch(`${hostbase}/devices/notification`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ user }),
        })
          .then((res) => res.json())
          .then((res) => {
            res.status === "Error" ? alert(res.msg) : alert(res.msg);
          })
          // Si hay error de conexión se envía una alerta
          .catch(function () {
            alert(
              "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
            );
          });
      }
    }
  }

  // Función para notificar a los estudiantes con dispositivos activos que deben devolver los dispositivos
  const notifyAll = function () {
    const sendMsg = window.confirm("Notify every user by email?");
    if (sendMsg) {
      if (rented.length === 0) {
        alert("There are currently no active users.");
      } else {
        fetch(`${hostbase}/devices/notification_all`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ rented }),
        })
          .then((res) => res.json())
          .then((res) => {
            res.status === "Error" ? alert(res.msg) : alert(res.msg);
          })
          // Si hay error de conexión se envía una alerta
          .catch(function () {
            alert(
              "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
            );
          });
      }
    }
  };

  const notify = function (user) {
    user === undefined ? notifyAll() : notifyOne(user);
  };

  return (
    <div className="devices-section">
      <Actives
        setUser={setUser}
        rented={rented}
        notify={notify}
        active={active}
        setActive={setActive}
        entries={entries}
        updateRented={updateRented}
      />
      <div className="modules">
        <Rent
          user={user}
          setUser={setUser}
          setActive={setActive}
          updateRented={updateRented}
          entryCount={entryCount}
        />
        <Search
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          handleSearch={handleSearch}
        />
        <Entries
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
