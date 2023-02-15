import React, { useState } from "react";

import reading from "../assets/reading.svg";

import Login from "./Login.jsx";

// This component shows the landing page. In here, the user will need to login to be able to access other components.
// This modal shows the login form component when the user wants to login. It is set to false by default.

export default function Index() {
  const [modal, setModal] = useState(false);
  return (
    <>
      {modal === true ? (
        <Login setModal={setModal} />
      ) : (
        <div className="index">
          <div>
            <h1>Knowledge Centre Resources</h1>
            <p>
              In this web application you are going to be able to access the
              different services that the Knowledge Centre Library offers, such
              as books and devices renting.
            </p>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setModal(true)}>Login</button>
            </div>
          </div>
          <div>
            <img src={reading} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
