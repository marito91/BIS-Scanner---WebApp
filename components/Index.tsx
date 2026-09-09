"use client";

import { useState } from "react";

import book from "@/assets/book.png";
import laptop from "@/assets/laptop.png";

import Login from "./Login";

// Migrated from src/components/Index.jsx. Client Component: a `modal` useState
// flag swaps the landing hero for <Login>, exactly as the original did — the
// two are mutually exclusive.
//
// The `restricted` flag comes from app/page.tsx reading the ?restricted query
// param (set by proxy.ts when an unauthenticated request hits a protected
// route). It seeds `modal` so a redirected-in visitor lands straight on the
// login form, and is forwarded to <Login> to render the restricted message.

export default function Index({ restricted = false }: { restricted?: boolean }) {
  const [modal, setModal] = useState(restricted);

  return (
    <>
      {modal === true ? (
        <Login setModal={setModal} restricted={restricted} />
      ) : (
        <>
          <div className="index">
            <div className="parent">
              <img id="book" src={book.src} alt="" />
              <img id="device" src={laptop.src} alt="" />
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
