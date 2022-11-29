import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Header from "./components/Header.jsx";
import Index from "./components/Index.jsx";
import hostbase from "./hostbase.js";

import "./styles.css";

function App() {
  // Se inicializan los datos de estados.
  // Data que muestra los códigos de barra cuando se registran
  const [data, setData] = React.useState("----------");
  // Bandera para activar el componente con la cámara
  const [index, setIndex] = React.useState(true);
  // Bandera para activar el componente con la cámara
  const [scanner, setScanner] = React.useState(false);
  // Objeto con la información del usuario que se enviará al backend
  const [user, setUser] = React.useState({
    document: "",
    device: "",
    number: "",
    name: "",
    section: "",
    date: "",
    time: "",
    email: "",
  });
  // Objeto con la info de búsqueda para desplegar información
  const [searchInfo, setSearchInfo] = React.useState({
    document: "",
    date: "",
    filter: "",
    device: "",
    number: "",
  });

  // Función para limpiar los input y select fields y no tener que repetir los setState cada vez que se realiza una operación con esa información
  const cleanFields = function (desiredObj) {
    desiredObj === "search"
      ? setSearchInfo({
          document: "",
          date: "",
          filter: "",
          device: "",
          number: "",
        })
      : setUser({
          document: "",
          device: "",
          number: "",
          name: "",
          section: "",
          date: "",
          time: "",
          email: "",
        });
  };

  // Esta tabla funciona para cargar y descargar los registros que el usuario desee consultar. Se actualiza con el botón/función de downloadEntries()
  const [history, setHistory] = React.useState([]);

  // Array que contiene toda la informacion de los dispositivos alquilados actualmente. Se actualiza con el botón/función de updateRented()
  const [rented, setRented] = React.useState([]);

  // Esta función permite desplegar la información pertinente del usuario seleccionado. Se pasa el objeto seleccionado de la tabla de rented y asigna la información de este al objeto User con el fin de mostrar cada uno de los datos del objeto.
  const selectUser = function (user) {
    const fname = user.firstName.split(" ");
    setUser({
      name: fname[0] + " " + user.lastName,
      section: user.grade,
      device: user.device,
      number: user.number,
      date: user.date,
      time: user.time,
      email: user.email,
    });
  };

  // Función que determina los valores que se asignan dentro del objeto User. Dispositivo y número. Se utiliza cuando se va a alquilar un dispositivo.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((user) => ({ ...user, [name]: value }));
    // console.log(user);
  };

  // Función que determina los valores que se asignan dentro del objeto SearchInfo. Dispositivo y número. Se utiliza cuando se va a realizar la búsqueda de un dispositivo o cuando se van a descargar registros.
  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchInfo((searchInfo) => ({ ...searchInfo, [name]: value }));
  };

  // Función que asigna el código de barra leído a la llave (document) del objeto User. Cuando el usuario registra el código de barra leído, esta función se encarga de asignar el código leído dentro a la llave document del objeto User.
  const handleCode = (event) => {
    setUser((user) => ({ ...user, document: data }));
    // console.log(`Person added: ${data}`);
  };

  // Esta función se encarga de realizar el envío de la información respectiva a los alquileres al backend con las respectivas validaciones.
  function rent() {
    // Si la llave (document) del objeto user es diferente a un documento válido entonces alerta que se asigne un documento correcto.
    if (user.document === "----------" || user.document === "") {
      alert("Por favor ingrese un código válido");
    } else {
      // No acepta el número del dispositivo si es mayor a 30 o si es menor o igual a 0 dado que no se cuenta con esos dispositivos en biblioteca.
      if (user.number > 30 || user.number <= 0) {
        alert(
          "No existe un dispositivo con ese número. Por favor ingrese un número válido."
        );
        // Si todas las validaciones se hacen entonces se comunica con el servidor back y envía la información correspondiente, es decir, el objeto User.
      } else {
        fetch(`${hostbase}/users/rent`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ user }),
        })
          .then((res) => res.json())
          .then((res) => {
            // Indica si se pudo o no realizar el alquiler. Existen otras validaciones en backend
            alert(res.msg);
          })
          // Si hay error de conexión se envía una alerta
          .catch(function () {
            alert(
              "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
            );
          });
        // Se restauran a string en blanco los valores del objeto user
        cleanFields();
      }
    }
  }

  // Esta función se encarga de la devolución de dispositivos. Esta recibe una String que indica el dispositivo que se va a devolver. Realiza el envío de la información al backend con las respectivas validaciones.
  function returnDevice(deviceNumber) {
    // Se separa el String para obtener el tipo de dispositivo y el número.
    // console.log(deviceNumber);
    const device = deviceNumber[0];
    const number = deviceNumber[1];
    const confirm = window.confirm(
      `El estudiante regresó en buenas condiciones el ${device} #${number}?`
    );
    // Se comunica con backend y envía la información
    if (confirm) {
      fetch(`${hostbase}/users/return`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ device, number }),
      })
        .then((res) => res.json())
        .then((res) => {
          // Indica si se pudo realizar la devolución o no
          alert(res.msg);
        })
        // Si hay error de conexión se envía una alerta
        .catch(function () {
          alert(
            "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
          );
        });
      // Se restauran a string en blanco los valores del objeto user
      cleanFields();
      // Se refresca la lista de rentados
      updateRented();
    }
  }

  // Esta función se encarga de la búsqueda de dispositivos con el fin de encontrar si un dispositivo se encuentra en uso y por quién.
  function searchDevice() {
    // Si no se especifica el tipo de dispositivo entonces arroja un mensaje para que ingrese uno válido
    if (searchInfo.device === "" || searchInfo.device === "- Dispositivo -") {
      alert("Por favor ingrese un tipo de dispositivo.");
    } else {
      // No acepta el número del dispositivo si es mayor a 30 o si es menor o igual a 0.
      if (searchInfo.number > 30 || searchInfo.number <= 0) {
        alert("Por favor ingrese un valor entre 1 y 30.");
        cleanFields("search");
      } else {
        fetch(`${hostbase}/users/search`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ searchInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.msg);
            alert(res.msg);
          })
          // Si hay error de conexión se envía una alerta
          .catch(function () {
            alert(
              "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
            );
          });
        // Se restauran a string en blanco los valores del objeto user
        cleanFields("search");
      }
    }
  }

  function downloadEntries() {
    let msg = "";
    if (searchInfo.filter === "" || searchInfo.filter === "- Filtro -") {
      alert("Por favor seleccione un filtro para su búsqueda");
    } else {
      if (searchInfo.filter === "Documento" && searchInfo.document === "") {
        alert("Por favor ingrese un documento válido.");
      } else if (searchInfo.filter === "Fecha" && searchInfo.date === "") {
        alert("Por favor ingrese una fecha válida.");
      } else {
        searchInfo.filter === "Documento"
          ? (msg = searchInfo.document)
          : (msg = searchInfo.date);
        fetch(`${hostbase}/users/entries`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ searchInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            setHistory(res.data);
            alert(
              `Registros de ${msg} cargados con éxito. Por favor proceda a descargarlos.`
            );
          })
          // Si hay error de conexión se envía una alerta
          .catch(function () {
            alert(
              "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
            );
          });
        // Se restauran a string en blanco los valores del objeto user
        cleanUp();
        cleanFields("search");
      }
    }
  }

  const downloadFile = function (arr) {
    const confirmation = window.confirm(
      "¿Desea descargar los registros seleccionados?"
    );
    if (confirmation) {
      const newArr = arr.map((entry) => [
        entry.grade,
        entry.firstName,
        entry.lastName,
        entry.code,
        entry.date,
        entry.time,
        entry.device,
        entry.number,
        entry.type,
      ]);

      let csvContent = "data:text/csv;charset=utf-8,";
      newArr.forEach(function (entry) {
        let row = entry.join(",");
        csvContent += row + "\r\n";
      });

      let encodedURI = encodeURI(csvContent);
      window.open(encodedURI);
    }
  };

  // Función para limpiar el historial reflejado
  function cleanUp() {
    setHistory([]);
  }

  // Función para actualizar la lista de dispositivos rentados actualmente
  function updateRented() {
    fetch(`${hostbase}/users/devices`, {
      headers: { "content-type": "application/json" },
      method: "GET",
      // body: JSON.stringify({ searchInfo }),
    })
      .then((res) => res.json())
      .then((res) => {
        res.status === "Error" ? alert(res.msg) : setRented(res.data);
      })
      // Si hay error de conexión se envía una alerta
      .catch(function () {
        alert(
          "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
        );
      });
  }

  // Función para notificar a los estudiantes con dispositivos activos que deben devolver los dispositivos
  const notifyAll = function () {
    const sendMsg = window.confirm(
      "Desea notificar a todos los usuarios por correo?"
    );
    if (sendMsg) {
      if (rented.length === 0) {
        alert("No hay usuarios con dispositivo alquilado actualmente.");
      } else {
        fetch(`${hostbase}/users/notification_all`, {
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

  // Funcion para notificar al estudiante seleccionado. Posteriormente se deben unir ambas funciones para mejorar código.
  function notifyOne(user) {
    if (user.email === "") {
      alert("Por favor seleccione un usuario");
    } else {
      const sendMsg = window.confirm(
        `Desea notificar al usuario ${user.name}?`
      );
      if (sendMsg) {
        fetch(`${hostbase}/users/notification`, {
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

  const notify = function (user) {
    // console.log(user);
    user === undefined ? notifyAll() : notifyOne(user);
  };

  // Función para determinar la página que se va a encontrar activa.
  function toggleSection(section) {
    if (section === "scanner") {
      setScanner(true);
      setIndex(false);
      cleanFields();
    } else if (section === "index") {
      setScanner(false);
      setIndex(true);
    }
  }

  // Función para regresar a la página principal
  function goBack() {
    setIndex(true);
    setScanner(false);
    updateRented();
  }

  // Función para revisar conexión a backend
  const mensaje = {
    txt: "Mensaje de prueba",
  };
  function testConnection() {
    fetch(`${hostbase}/users/prueba`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ mensaje }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.msg);
      })
      .catch(function () {
        alert(
          "En este momento no hay conexion a base de datos. Por favor solicite soporte."
        );
      });
  }
  return (
    <>
      <Header
        goBack={goBack}
        toggleSection={toggleSection}
        testConnection={testConnection}
      />
      {index === true ? (
        <Index
          toggleSection={toggleSection}
          testConnection={testConnection}
          rented={rented}
          updateRented={updateRented}
          notify={notify}
          returnDevice={returnDevice}
          user={user}
          selectUser={selectUser}
          searchDevice={searchDevice}
          handleSearch={handleSearch}
          searchInfo={searchInfo}
          history={history}
          downloadFile={downloadFile}
          downloadEntries={downloadEntries}
        />
      ) : (
        <></>
      )}
      {scanner === true ? (
        <>
          <div className="barcode-scanner">
            <div className="camera">
              <BarcodeScannerComponent
                width={600}
                height={600}
                onUpdate={(err, result) => {
                  if (result) setData(result.text);
                  else setData("----------");
                }}
              />
            </div>
            <div className="device-info">
              <div className="code">
                <label>Código de barra: {data}</label>
                <button onClick={() => handleCode()}>Asignar</button>
              </div>
              <label>Documento seleccionado:</label>
              {user !== null ? (
                <label id="documento">{user.document}</label>
              ) : (
                <></>
              )}
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
                  <label>Enter device number</label>
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
              <div className="group">
                <button style={{ width: "30%" }} onClick={() => rent()}>
                  Alquilar
                </button>
                <button style={{ width: "30%" }} onClick={() => goBack()}>
                  Atrás
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
