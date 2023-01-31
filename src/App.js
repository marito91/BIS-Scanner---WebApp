// Libraries, dependencies, etc...
import React, { useState } from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./authentication/auth";

/** App Requirements
 * npm install --save react-barcode-reader
 * npm install react-router-dom
 * npm install --save jwt-decode
 * Agregar el hostbase.js
 * Aplicar el open ssl
 * Remover el Browser especificado de package.json
 */

// Main Components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./components/Index.jsx";
import Restricted from "./components/Restricted.jsx";

// App Components
import Devices from "./components/Devices.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Books from "./components/Books.jsx";

function App() {
  /** LISTADO DE OBJETOS/ESTADOS
   * Se inicializan los datos de estados.
   * En esta  seccion se declaran los objetos principales de la aplicacion. Estos se declaran por medio de estados mutables (useState) con el
   * fin de poder utilizarlos de manera dinamica a traves de toda la aplicacion. Se inicializan aqui porque son estrictamente necesarios.
   * Estos objetos se utilizan en casi todos los componentes de la aplicacion, sin embargo, se pasan como parametros ({props}) a los componentes
   * dependiendo del uso/necesidad que tengan.
   */

  // Objeto con la información del usuario
  const [user, setUser] = useState({
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

  // This function removes the token from the localstorage and reloads the page so that the user logs out.
  function logout() {
    const confirmation = window.confirm("Do you want to log out?");
    if (confirmation) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  return (
    <>
      <BrowserRouter>
        <Header logout={logout} />
        <Routes>
          {/* This is the landing page. No props needed in the index page. */}
          <Route path="/" element={<Index />}></Route>

          {/* This route leads to the dashboard. The restricted component shows in case somebody tries to head into it and is not logged in. */}
          <Route
            path="/home"
            element={auth() ? <Dashboard /> : <Restricted />}
          ></Route>

          {/* This route leads to the devices section, where the user can rent/return devices, check and notify active users and download records for device usage. The user needs to be logged in to be able to use these tools. */}
          <Route
            path="/devices"
            element={
              auth() ? (
                <Devices user={user} setUser={setUser} />
              ) : (
                <Restricted />
              )
            }
          ></Route>

          {/* This route leads to the books section, where the user can rent/return books, add/edit/search/delete books from the school database and check the circulation live. The user needs to be logged in to be able to use these tools.  */}
          <Route
            path="/books"
            element={
              auth() ? <Books user={user} setUser={setUser} /> : <Restricted />
            }
          ></Route>
        </Routes>
        <Footer logout={logout} />
      </BrowserRouter>
    </>
  );
}

export default App;
