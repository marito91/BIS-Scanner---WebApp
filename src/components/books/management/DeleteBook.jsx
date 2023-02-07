import React, { useState, useEffect } from "react";
import hostbase from "../../../hostbase.js";
// import autoComplete from "./autocomplete";

import title from "../../../assets/book-icons/title.png";
import author from "../../../assets/book-icons/author.png";
import barcodeImg from "../../../assets/book-icons/barcode.png";
import isbn from "../../../assets/book-icons/isbn.png";
import price from "../../../assets/book-icons/price.png";
import calendar from "../../../assets/book-icons/calendar.png";
import material from "../../../assets/book-icons/material.png";
import location from "../../../assets/book-icons/location.png";
import vendor from "../../../assets/book-icons/vendor.png";
import circulation from "../../../assets/book-icons/circulation.png";
import dewey from "../../../assets/book-icons/dewey.png";
import condition from "../../../assets/book-icons/condition.png";

export default function DeleteBook({ books }) {
  const [barcode, setBarcode] = useState("");
  const [activeBook, setActiveBook] = useState({
    title: "Title",
    author: "Author",
    barcode: "Barcode",
    isbn: "ISBN/ISSN",
    price: "Price",
    publicationYear: "Publication year",
    materialType: "Material Type",
    sublocation: "Sublocation",
    vendor: "Vendor",
    circulationType: "Circulation Type",
    dewey: "Dewey",
    condition: "None",
  });

  const handleBarcode = (event) => {
    const value = event.target.value;
    setBarcode(value.toUpperCase());
  };

  function bookFilter(chosenBarcode) {
    const bookToDelete = books.filter((book) => book.barcode === chosenBarcode);
    console.log(bookToDelete);
    return bookToDelete;
  }

  function handleActiveBook(filteredBook) {
    setActiveBook(filteredBook[0]);
    console.log(activeBook);
  }

  return (
    <div>
      <div className="autocomplete">
        <label htmlFor="">Barcode</label>
        <input
          type="text"
          name="barcode"
          value={barcode}
          placeholder="T 1294"
          onChange={handleBarcode}
        />
      </div>
      <div className="book-info">
        <div className="book-info-col-1">
          <div>
            <img src={title} alt="" />
            <label htmlFor="">{activeBook.title}</label>
          </div>
          <div>
            <img src={author} alt="" />
            <label htmlFor="">{activeBook.author}</label>
          </div>
          <div>
            <img src={barcodeImg} alt="" />
            <label htmlFor="">{activeBook.barcode}</label>
          </div>
          <div>
            <img src={isbn} alt="" />
            <label htmlFor="">{activeBook.isbn}</label>
          </div>
          <div>
            <img src={price} alt="" />
            <label htmlFor="">{`$${activeBook.price} pesos`}</label>
          </div>
          <div>
            <img src={calendar} alt="" />
            <label htmlFor="">{activeBook.publicationYear}</label>
          </div>
        </div>
        <div className="book-info-col-2">
          <div>
            <img src={material} alt="" />
            <label htmlFor="">{activeBook.materialType}</label>
          </div>
          <div>
            <img src={location} alt="" />
            <label htmlFor="">{activeBook.sublocation}</label>
          </div>
          <div>
            <img src={vendor} alt="" />
            <label htmlFor="">{activeBook.vendor}</label>
          </div>
          <div>
            <img src={circulation} alt="" />
            <label htmlFor="">{activeBook.circulationType}</label>
          </div>
          <div>
            <img src={dewey} alt="" />
            <label htmlFor="">{activeBook.dewey}</label>
          </div>
          <div>
            <img src={condition} alt="" />
            <label htmlFor="">{activeBook.condition}</label>
          </div>
        </div>
      </div>
      <div className="active-tools-btns">
        <button onClick={() => handleActiveBook(bookFilter(barcode))}>
          Load
        </button>
        <button>Delete</button>
      </div>
    </div>
  );
}
