import React, { useState } from "react";
import hostbase from "../../../hostbase.js";

import "../../books/management.css";

export default function NewBook() {
  /**
   * title: 
  author: 
  barcode: 
  circulationType: 
  isbn
  materialType: 
  publicationYear: 
  price: 
  sublocation: 
  vendor: 
  dewey: 
   */

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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook((book) => ({ ...book, [name]: value }));
  };

  function insertNewBook() {
    const confirm = window.confirm(
      `Do you want to create a new entry in the database for the book ${book.title}`
    );
    if (confirm) {
      if (book.materialType === "- Choose one -") {
        alert("Please enter the Material Type ");
      } else if (book.circulationType === "- Choose one") {
        alert("Please enter the Circulation Type ");
      } else {
        fetch(`${hostbase}/books/new-book`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ book }),
        })
          .then((res) => res.json())
          .then((res) => {
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
              alert(res.msg);
            }
          })
          .catch(function () {
            alert(
              "A connection with the server could not be established, please contact ICT Support."
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
