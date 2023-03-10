import React, { useState } from "react";
import hostbase from "../../../hostbase.js";

import "../../books/management.css";

export default function NewBook() {
  // An object which will contain the book information is created. All values are set to null in the initial state.
  const [book, setBook] = useState({
    barcode: "",
    author: "",
    title: "",
    publicationYear: "",
    isbn: "",
    price: "",
    circulationType: "",
    materialType: "",
    sublocation: "",
    vendor: "",
    dewey: "",
  });

  // After that, a function that will handle any changes in the input and select fields is created. The function handleChange() will manage the book object.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook((book) => ({ ...book, [name]: value }));
  };

  // Finally, the function insertNewBook() will send all of the information to the server after going through different validations first.
  function insertNewBook() {
    // Since most of the inputs are required, the function can go through a confirmation first.
    const confirm = window.confirm(
      `Do you want to create a new entry in the database for the book ${book.title}`
    );
    if (confirm) {
      // After confirming, then the select fields will be validated.
      if (book.materialType === "- Choose one -") {
        alert("Please enter the Material Type ");
      } else if (book.circulationType === "- Choose one") {
        alert("Please enter the Circulation Type ");
      } else {
        // If everything is ok, then the information will be sent to the server.
        fetch(`${hostbase}/books/new-book`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ book }),
        })
          .then((res) => res.json())
          .then((res) => {
            // If everything turns ok in the server, an alert with the message is displayed and the book object's values are set to default.
            if (res.status === "ok") {
              alert(res.msg);
              setBook({
                barcode: "",
                author: "",
                title: "",
                publicationYear: "",
                isbn: "",
                price: "",
                circulationType: "",
                materialType: "",
                sublocation: "",
                vendor: "",
                dewey: "",
              });
            } else {
              // If the creation of a new book in database is not successful, then only a message will be displayed through an alert.
              alert(res.msg);
            }
          })
          .catch(function () {
            // If there is an error in the communication with the server, an alert will be shown.
            alert(
              "A connection with the server could not be established while trying to insert a new book. Please contact ICT Support."
            );
          });
      }
    }
  }

  return (
    <>
      <div className="update-book-form">
        <div>
          <label htmlFor="">Title</label>
          <input
            name="title"
            value={book.title}
            onChange={handleChange}
            id=""
            required
          ></input>
          <label htmlFor="">Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            id=""
            required
          />
          <label htmlFor="" required>
            Barcode
          </label>
          <input
            type="text"
            name="barcode"
            value={book.barcode}
            onChange={handleChange}
            id=""
            required
          />
          <label htmlFor="">Publication Year</label>
          <input
            type="text"
            name="publicationYear"
            value={book.publicationYear}
            onChange={handleChange}
            maxLength={4}
            id=""
            required
          />
          <label htmlFor="">ISBN/ISSN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            id=""
            required
          />
          <label htmlFor="">Price</label>
          <input
            type="text"
            name="price"
            value={book.price}
            onChange={handleChange}
            id=""
            required
          />
        </div>
        <div>
          <label htmlFor="">Material Type</label>
          <select
            name="materialType"
            value={book.materialType}
            onChange={handleChange}
            id=""
            required
          >
            <option>- Choose one -</option>
            <option>Book</option>
            <option>Big Book</option>
            <option>Magazine</option>
            <option>Text Book</option>
          </select>
          <label htmlFor="">Sublocation</label>
          <input
            type="text"
            name="sublocation"
            value={book.sublocation}
            onChange={handleChange}
            id=""
            required
          />
          <label htmlFor="">Vendor</label>
          <input
            type="text"
            name="vendor"
            value={book.vendor}
            onChange={handleChange}
            id=""
            required
          />
          <label htmlFor="">Circulation Type</label>
          <select
            name="circulationType"
            value={book.circulationType}
            onChange={handleChange}
            id=""
          >
            <option>- Choose one -</option>
            <option>RESOURCES</option>
            <option>REGULAR PRIMARY</option>
            <option>REGULAR SECONDARY</option>
          </select>
          <label htmlFor="">Dewey</label>
          <input
            type="text"
            name="dewey"
            value={book.dewey}
            onChange={handleChange}
            id=""
            required
          />
        </div>
      </div>
      <div className="active-tools-btns">
        <button onClick={() => insertNewBook()}>Insert</button>
      </div>
    </>
  );
}
