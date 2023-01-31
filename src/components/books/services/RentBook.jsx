import React, { useState } from "react";
import hostbase from "../../../hostbase.js";

export default function RentBook({ user }) {
  const [document, setDocument] = useState();
  const [barcode, setBarcode] = useState("");
  const handleDocument = (event) => {
    const value = event.target.value;
    setDocument(value);
  };
  const handleBarcode = (event) => {
    const value = event.target.value;
    setBarcode(value);
  };

  function rentBook() {
    fetch(`${hostbase}/books/rent`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ document, barcode }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Indica si se pudo o no realizar el alquiler. Existen otras validaciones en backend
        alert(res.msg);
        setBarcode("");
        setDocument("");
        // window.location.href = "/books";
      })
      // Si hay error de conexión se envía una alerta
      .catch(function () {
        alert(
          "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
        );
        setBarcode("");
        setDocument("");
      });
  }
  return (
    <div className="service">
      <h2>Rent Book</h2>
      <label htmlFor="">Student Document</label>
      <input
        type="text"
        placeholder="Document number"
        name="document"
        value={document}
        onChange={handleDocument}
      />
      <label htmlFor="">Book Barcode</label>
      <input
        type="text"
        placeholder="T 0000"
        name="barcode"
        value={barcode}
        onChange={handleBarcode}
      />
      <button onClick={() => rentBook()}>Rent Book</button>
    </div>
  );
}
