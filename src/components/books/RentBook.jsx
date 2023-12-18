import React, { useState } from "react";

import hostbase from "../../hostbase.js";
import close from "../../assets/x.svg";

export default function RentBook({ showNotification, admin, closeRentModal }) {
  /** The initial states are declared.
   * Document = Which will manage the client's document number.
   * DueDate = Which will assign the date in which the book has to be returned.
   * Barcode = Which will manage the book that wants to be rented.
   */
  const [document, setDocument] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [barcode, setBarcode] = useState("");

  /** Then, the functions that will handle each one of the input fields are declared.
   * HandleDocument = Manages the documents state.
   * HandleBarcode = Manages the barcode state.
   * HandleDueDate = Manages the dueDate state.
   */
  const handleDocument = (event) => {
    const value = event.target.value;
    setDocument(value);
  };
  const handleBarcode = (event) => {
    const value = event.target.value;
    setBarcode(value);
  };
  const handleDueDate = (event) => {
    const value = event.target.value;
    setDueDate(value);
  };

  // Then the function rentBook() is declared in which the information from the previous states and inputs will be sent to the server so that it can validate with database and confirm if a book could be rented or not.
  function rentBook() {
    if (isNaN(document)) {
      showNotification("Error", "Please enter a valid document.");
    } else {
      fetch(`${hostbase}/books/rent`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ document, barcode, dueDate, admin }),
      })
        .then((res) => res.json())
        .then((res) => {
          // Despite if the book could or couldn't be rented, the app sends an alert and sets the previous states to default, except the dueDate, which will probably be the same when renting in big groups.
          if (res.status.toLowerCase() === "error") {
            showNotification("Error", res.msg);
          } else {
            showNotification("Alert", res.msg);
          }
          setBarcode("");
          setDocument("");
          // window.location.href = "/books";
        })
        // If there's an error connecting to server, an alert is displayed.
        .catch(function () {
          showNotification(
            "Error",
            "A connnection with the server could not be established while trying to rent a book. Please contact ICT Support."
          );
          setBarcode("");
          setDocument("");
        });
    }
  }
  return (
    <div className="rent-form">
      <h2>Rent Book</h2>
      <div className="rent-form-container">
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
        <label htmlFor="">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={handleDueDate}
        />
      </div>
      <div className="rent-modal-btns">
        {/* <button id="cancel-btn" onClick={closeRentModal}>
          Close
        </button> */}
        <button id="return-btn" onClick={() => rentBook()}>
          Rent
        </button>
      </div>
      <div className="close-button-container">
        <img src={close} alt="" onClick={() => closeRentModal(false)} />
      </div>
    </div>
  );
}
