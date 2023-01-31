import React, { useState } from "react";
import hostbase from "../../../hostbase.js";

export default function ReturnBook() {
  const [barcode, setBarcode] = useState("");

  const handleBarcode = (event) => {
    const value = event.target.value;
    setBarcode(value);
  };

  function returnBook() {
    fetch(`${hostbase}/books/return`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ barcode }),
    })
      .then((res) => res.json())
      .then((res) => {
        // Indica si se pudo o no realizar el alquiler. Existen otras validaciones en backend
        alert(res.msg);
        setBarcode("");
        // window.location.href = "/books";
      })
      // Si hay error de conexión se envía una alerta
      .catch(function () {
        alert(
          "En este momento no hay conexion al servidor. Por favor solicite soporte a SISTEMAS."
        );
      });
  }
  return (
    <div className="service">
      <h2>Return Book</h2>
      <label htmlFor="">Book Barcode</label>
      <input
        type="text"
        placeholder="T 0000"
        name="barcode"
        value={barcode}
        onChange={handleBarcode}
      />
      <button onClick={() => returnBook()}>Return Book</button>
    </div>
  );
}
