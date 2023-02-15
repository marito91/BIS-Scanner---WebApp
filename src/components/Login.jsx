import React, { useState } from "react";
import hostbase from "../hostbase.js";

import x from "../assets/x.svg";

// This function component will contain the login form for users that are trying to log in into the application. It receives the setModal function as props to close the window in case the user wants to go back to the previous component.

export default function Login({ setModal }) {
  // This object will manage the information submitted in the form. It starts as an empty object with useState but will change depending on the information submitted. It will also serve as info sent to server side to check data.
  const [localUser, setLocalUser] = useState({ username: "", password: "" });

  // This toggles the information set in the localUser object. When the user inputs the information in the form, the object will change.
  const handleCredentials = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLocalUser((localUser) => ({ ...localUser, [name]: value }));
  };

  // Function for logging in. Checks if the data input from the user is correct in the backend server by fetching.
  const login = (event) => {
    // Prevents that the form refreshes everytime is submitted.
    event.preventDefault();
    // Fetches information from server side via the POST method.
    fetch(`${hostbase}/users/login`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ localUser }),
    })
      .then((res) => res.json())
      .then((res) => {
        // If the function works on server side, the token will be set in the local storage and the localUser will reset. The function will also automatically send the user to the dashboard page.
        if (res.status === "ok") {
          localStorage.setItem("token", res.token);
          setLocalUser({
            username: "",
            password: "",
          });
          window.location.href = "/home";
        } else {
          // If the data cannot be validated then it will alert the user that the information submitted is not correct.
          alert(`${res.status}: ${res.msg}`);
          console.log("Your email or password is incorrect");
          setLocalUser({
            username: "",
            password: "",
          });
        }
      });
  };

  // This function will send the localUser information to server and check if the person trying to signup is part of the team.
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
