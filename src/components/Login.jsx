import React, { useState } from "react";
import hostbase from "../hostbase.js";

import x from "../assets/x.svg";

export default function Login({ setModal }) {
  // Este objeto se utiliza para permitir al administrador loguear/utilizar la plataforma.
  const [localUser, setLocalUser] = useState({ username: "", password: "" });

  // SECCION PARA LOGUEAR USUARIO
  // Funcion togglear modal de login
  const handleCredentials = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLocalUser((localUser) => ({ ...localUser, [name]: value }));
  };

  // Function for logging in. Checks if the data input from the user is correct in the backend server by fetching.
  const login = (event) => {
    event.preventDefault();
    fetch(`${hostbase}/users/login`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ localUser }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "ok") {
          localStorage.setItem("token", res.token);
          setLocalUser({
            username: "",
            password: "",
          });
          window.location.href = "/home";
        } else {
          alert(`${res.status}: ${res.msg}`);
          console.log("Your email or password is incorrect");
          setLocalUser({
            username: "",
            password: "",
          });
        }
      });
  };

  function signup() {
    const confirmation = window.confirm(
      "Do you want to register the new admin with the data provided?"
    );
    if (confirmation) {
      fetch(`${hostbase}/users/signup`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ localUser }),
      })
        .then((res) => res.json())
        .then((res) => {
          res.status === "Error" ? alert(res.msg) : alert(res.msg);
          setLocalUser({
            username: "",
            password: "",
          });
        })
        // Si hay error de conexión se envía una alerta
        .catch(function () {
          alert(
            "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
          );
        });
    }
  }
  return (
    <div className="container">
      <div className="center">
        <img src={x} alt="" onClick={() => setModal(false)} />
        <h1>Login</h1>
        <form onSubmit={login} action="">
          <div className="txt_field">
            <input
              type="email"
              name="username"
              value={localUser.username}
              onChange={handleCredentials}
              required
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              name="password"
              value={localUser.password}
              onChange={handleCredentials}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <div
            className="pass"
            onClick={() =>
              alert("If you forgot your password please contact support!")
            }
          >
            Forgot Password?
          </div>
          <input name="submit" type="Submit" value="Login" />
          <div className="signup_link">
            Not a Member ? <label onClick={() => signup()}>Signup</label>
          </div>
        </form>
      </div>
    </div>
  );
}
