"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import x from "@/assets/x.svg";
import forbid from "@/assets/forbid.svg";
import hostbase from "../src/hostbase.js";

// Migrated from src/components/Login.jsx. Same form, fields, validation and
// error display as the original. Two behavioral changes required by the auth
// migration:
//   1. login() POSTs to the /api/auth/login route handler (BFF) instead of
//      fetching hostbase directly. That route sets the httpOnly cookie and
//      returns { status: "ok" } with no token in the body (or { status, msg }
//      on failure), so there is nothing to stash in localStorage anymore.
//   2. On success we navigate with next/navigation's router (client-side
//      transition) rather than assigning window.location.href.
// signup() still talks to hostbase directly — there is no BFF route for it yet
// and it never handled a token, so it is left as-is (see BACKLOG.md).
//
// Props (both from <Index>): setModal closes the form back to the landing hero
// via the close (X) icon, and `restricted` renders the message that
// src/components/Restricted.jsx used to show, above the form.

export default function Login({
  setModal,
  restricted = false,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  restricted?: boolean;
}) {
  const router = useRouter();

  // This object will manage the information submitted in the form. It starts as an empty object with useState but will change depending on the information submitted. It will also serve as info sent to server side to check data.
  const [localUser, setLocalUser] = useState({ username: "", password: "" });

  // This toggles the information set in the localUser object. When the user inputs the information in the form, the object will change.
  const handleCredentials = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as "username" | "password";
    const value = event.target.value;
    setLocalUser((localUser) => ({ ...localUser, [name]: value }));
  };

  // Function for logging in. Checks if the data input from the user is correct by POSTing to the login route handler, which validates against the backend and sets the httpOnly cookie.
  const login = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevents that the form refreshes everytime is submitted.
    event.preventDefault();
    fetch(`/api/auth/login`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(localUser),
    })
      .then((res) => res.json())
      .then((res) => {
        // On success the cookie is already set by the route handler; just reset the form and send the user to the dashboard.
        if (res.status === "ok") {
          setLocalUser({
            username: "",
            password: "",
          });
          router.push("/home");
        } else {
          // If the data cannot be validated then it will alert the user that the information submitted is not correct.
          alert(`${res.status}: ${res.msg}`);
          console.log("Your email or password is incorrect");
          setLocalUser({
            username: "",
            password: "",
          });
        }
      })
      .catch(() => {
        alert("There was a problem reaching the server. Please try again.");
      });
  };

  // This function will send the localUser information to server and check if the person trying to signup is part of the team.
  function signup() {
    const confirmation = window.confirm(
      "Do you want to register the new admin with the data provided?",
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
            "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS.",
          );
        });
    }
  }

  return (
    <div className="container">
      <div className="center">
        <img src={x.src} alt="" onClick={() => setModal(false)} />
        {restricted ? (
          <div className="restricted">
            <img src={forbid.src} alt="" />
            <h1>We are sorry...</h1>
            <h2>The page you are trying to access is restricted.</h2>
            <h2> Please refer to your system administrator.</h2>
          </div>
        ) : null}
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
          <input name="submit" type="submit" value="Login" />
          <div className="signup_link">
            Not a Member ? <label onClick={() => signup()}>Signup</label>
          </div>
        </form>
      </div>
    </div>
  );
}
