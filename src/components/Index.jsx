import React, { useState } from "react";
import book from "../assets/book.png";
import laptop from "../assets/laptop.png";

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
        <>
          <div className="index">
            <div className="parent">
              <img id="book" src={book} alt="" />
              <img id="device" src={laptop} alt="" />
            </div>
            <h1>Knowledge Centre Resources</h1>
            <p>
              In this web application you can access the different services the
              Knowledge Centre offers, such as books and devices renting.
            </p>
            <button onClick={() => setModal(true)}>Get Started {"->"}</button>
          </div>
          <div className="copyright">
            <p>
              British International School App © 2022 &nbsp; Barranquilla,
              Colombia
            </p>
          </div>
        </>
      )}
    </>
  );
}
