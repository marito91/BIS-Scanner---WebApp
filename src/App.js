import React from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Header from "./Header.jsx";
import Index from "./Index.jsx";
import Return from "./Return.jsx";
import Entries from "./Entries.jsx";
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
  // Bandera para activar el componente de devolución
  const [back, setBack] = React.useState(false);
  // Bandera para activar el componente de descargas
  const [download, setDownload] = React.useState(false);
  // Objeto con la información del usuario que se enviará al backend
  const [userInfo, setUserInfo] = React.useState({
    code: "",
    device: "",
    number: "",
  });
  // Objeto con la info de búsqueda para desplegar información
  const [searchInfo, setSearchInfo] = React.useState({
    document: "",
    date: "",
    filter: "",
  });
  // Tabla para visualizar el historial solicitado en la sección de Entries
  const [history, setHistory] = React.useState([]);

  // Tabla para visualizar el historial solicitado en la sección de Entries
  const [rented, setRented] = React.useState([]);

  // Función que determina los valores que se asignan dentro del objeto. Dispositivo y número.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  // Función que determina los valores que se asignan dentro del objeto. Dispositivo y número.
  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchInfo((searchInfo) => ({ ...searchInfo, [name]: value }));
  };

  // Función que asigna el código de barra leído a la llave (code) del objeto userInfo.
  const handleCode = (event) => {
    setUserInfo((userInfo) => ({ ...userInfo, code: data }));
    console.log(`Person added: ${data}`);
  };

  // Esta función realiza el envío de la información al backend con las respectivas validaciones.
  function rent() {
    // Si la llave (code) del objeto userInfo es diferente a un documento válido entonces alerta que se asigne un documento correcto.
    if (userInfo.code === "----------" || userInfo.code === "") {
      alert("Por favor ingrese un código válido");
      // De lo contrario se comunica con el servidor back y envía la información correspondiente.
    } else {
      // No acepta el número del dispositivo si es mayor a 30 o si es menor o igual a 0.
      if (userInfo.number > 30 || userInfo.number <= 0) {
        alert(
          "No existe un dispositivo con ese número. Por favor ingrese un número válido."
        );
      } else {
        fetch(`${hostbase}/users/rent`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ userInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.msg);
            alert(res.msg);
          });
        // Se restauran a string en blanco los valores del objeto userInfo
        setUserInfo({
          code: "",
          device: "",
          number: "",
        });
      }
    }
  }

  // Esta función se encarga de la devolución de dispositivos y realiza el envío de la información al backend con las respectivas validaciones.
  function returnDevice() {
    // Si no se especifica el tipo de dispositivo entonces arroja un mensaje para que ingrese uno válido
    if (userInfo.device === "" || userInfo.device === "- Dispositivo -") {
      alert("Por favor ingrese un tipo de dispositivo.");
    } else {
      // No acepta el número del dispositivo si es mayor a 30 o si es menor o igual a 0.
      if (userInfo.number > 30 || userInfo.number <= 0) {
        alert(
          "No existe un dispositivo con ese número. Por favor ingrese un número válido."
        );
      } else {
        fetch(`${hostbase}/users/return`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ userInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.msg);
            alert(res.msg);
          });
        // Se restauran a string en blanco los valores del objeto userInfo
        setUserInfo({
          code: "",
          device: "",
          number: "",
        });
      }
    }
  }

  // Esta función se encarga de la búsqueda de dispositivos con el fin de encontrar si un dispositivo se encuentra en uso y por quién.
  function searchDevice() {
    // Si no se especifica el tipo de dispositivo entonces arroja un mensaje para que ingrese uno válido
    if (userInfo.device === "" || userInfo.device === "- Dispositivo -") {
      alert("Por favor ingrese un tipo de dispositivo.");
    } else {
      // No acepta el número del dispositivo si es mayor a 30 o si es menor o igual a 0.
      if (userInfo.number > 30 || userInfo.number <= 0) {
        alert(
          "No existe un dispositivo con ese número. Por favor ingrese un número válido."
        );
      } else {
        fetch(`${hostbase}/users/search`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ userInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res.msg);
            alert(res.msg);
          });
        // Se restauran a string en blanco los valores del objeto userInfo
        setSearchInfo({
          document: "",
          date: "",
          filter: "",
        });
      }
    }
  }

  function downloadEntries() {
    if (searchInfo.filter === "" || searchInfo.filter === "- Filtro -") {
      alert("Por favor seleccione un filtro para su búsqueda");
    } else {
      if (searchInfo.filter === "Documento" && searchInfo.document === "") {
        alert("Por favor ingrese un documento válido.");
      } else if (searchInfo.filter === "Fecha" && searchInfo.date === "") {
        alert("Por favor ingrese una fecha válida.");
      } else {
        fetch(`${hostbase}/users/entries`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ searchInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            setHistory(res.data);
          });
        // Se restauran a string en blanco los valores del objeto userInfo
        setSearchInfo({
          document: "",
          date: "",
          filter: "",
        });
      }
    }
  }

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
      });
  }

  // Función para determinar la página que se va a encontrar activa.
  function toggleSection(section) {
    if (section === "scanner") {
      setScanner(true);
      setBack(false);
      setDownload(false);
      setIndex(false);
    } else if (section === "back") {
      setBack(true);
      setDownload(false);
      setScanner(false);
      setIndex(false);
    } else if (section === "download") {
      setDownload(true);
      setBack(false);
      setScanner(false);
      setIndex(false);
    }
  }

  // Función para regresar a la página principal
  function goBack() {
    setIndex(true);
    setBack(false);
    setScanner(false);
    setDownload(false);
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
      });
  }
  return (
    <>
      <Header />
      {index === true ? (
        <Index
          toggleSection={toggleSection}
          testConnection={testConnection}
          rented={rented}
          updateRented={updateRented}
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
                <button onClick={() => handleCode()}>Assign</button>
              </div>
              <label>Documento agregado:</label>
              {userInfo !== null ? <label>{userInfo.code}</label> : <></>}
              <label>Seleccione el dispositivo:</label>
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
              <label>Enter device number</label>
              <input
                name="number"
                value={userInfo.number}
                type="text"
                placeholder="01, 16, 28, etc..."
                onChange={handleChange}
                required
              ></input>
              <div style={{ display: "flex" }}>
                <button style={{ width: "50%" }} onClick={() => rent()}>
                  Rent
                </button>
                <button style={{ width: "50%" }} onClick={() => goBack()}>
                  Atrás
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {back === true ? (
        <Return
          userInfo={userInfo}
          returnDevice={returnDevice}
          searchDevice={searchDevice}
          handleChange={handleChange}
          goBack={goBack}
        />
      ) : (
        <></>
      )}
      {download === true ? (
        <Entries
          searchInfo={searchInfo}
          downloadEntries={downloadEntries}
          handleSearch={handleSearch}
          goBack={goBack}
          history={history}
          cleanUp={cleanUp}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
