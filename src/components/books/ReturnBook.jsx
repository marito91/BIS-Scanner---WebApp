import React, { useState } from "react";
import hostbase from "../../hostbase.js";
import close from "../../assets/x.svg";

export default function ReturnBook({
  showNotification,
  admin,
  closeReturnModal,
}) {
  // To return a book, only the barcode is needed so that's why in this component, the only state to declare is the barcode.
  const [barcode, setBarcode] = useState("");

  // There will be a function that handles the barcode state.
  const handleBarcode = (event) => {
    const value = event.target.value;
    setBarcode(value);
  };

  // The function return book will send the barcode to the server and after the validations it will set the book to available and unassign it from the previous user.
  function returnBook() {
    console.log(barcode);
    if (!barcode) {
      showNotification("Error", "Please enter all input fields!");
    } else {
      fetch(`${hostbase}/books/return`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ barcode, admin }),
      })
        .then((res) => res.json())
        .then((res) => {
          // A message will be displayed regarding if the return could be done or not.
          showNotification("Alert", res.msg);
          setBarcode("");
          // window.location.href = "/books";
        })
        // If there's a connection error, an alert is displayed.
        .catch(function () {
          showNotification(
            "Error",
            "A connection with the server could not be established while trying to return a book. Please contact ICT Support."
          );
        });
    }
  }
  return (
    <div className="rent-form">
      <h2>Return Book</h2>
      <div className="rent-form-container">
        <label htmlFor="">Book Barcode</label>
        <input
          type="text"
          placeholder="T 0000"
          name="barcode"
          value={barcode}
          onChange={handleBarcode}
        />
      </div>
      <div className="rent-modal-btns">
        {/* <button id="cancel-btn" onClick={closeReturnModal}>
          Close
        </button> */}
        <button id="return-btn" onClick={() => returnBook()}>
          Return
        </button>
      </div>
      <div className="close-button-container">
        <img src={close} alt="" onClick={() => closeReturnModal(false)} />
      </div>
    </div>
  );
}
