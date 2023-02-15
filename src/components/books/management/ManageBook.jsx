import React, { useState } from "react";
import hostbase from "../../../hostbase.js";

export default function ManageBook() {
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
  condition:
   */

  const [barcode, setBarcode] = useState("");

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
    condition: "",
  });

  const handleBarcode = (event) => {
    const value = event.target.value;
    setBarcode(value);
  };

  const handleBook = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook((book) => ({ ...book, [name]: value }));
  };

  function getBook(barcode) {
    fetch(`${hostbase}/books/getBook`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ barcode }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "ok") {
          alert(res.msg);
          // console.log(res.bookExists);
          setBook(res.bookExists);
        } else {
          alert(res.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "There is currently no access to server. Please contact ICT support."
        );
      });
  }

  function updateBook() {
    const confirm = window.confirm(
      "Are you sure you want to update this book?"
    );
    if (confirm) {
      fetch(`${hostbase}/books/update`, {
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
              condition: "",
            });
          } else {
            alert(res.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
          alert(
            "There is currently no access to server. Please contact ICT support."
          );
        });
    }
  }

  function deleteBook(barcode) {
    if (book.title === "") {
      alert("Please load a book first!");
    } else {
      const confirm = window.confirm(
        "Are you sure you want to DELETE this book?"
      );
      if (confirm) {
        const secondConfirmation = window.confirm(
          "Are you really sure you want to DELETE THIS book? This will eliminate it from the database... 😱"
        );
        if (secondConfirmation) {
          fetch(`${hostbase}/books/delete`, {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ barcode }),
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
                  condition: "",
                });
              } else {
                alert(res.msg);
              }
            })
            .catch(function (error) {
              console.log(error);
              alert(
                "There is currently no access to server. Please contact ICT support."
              );
            });
        }
      }
    }
  }

  return (
    <>
      <div className="autocomplete">
        <label htmlFor="">Barcode:</label>
        <input
          type="text"
          name="barcode"
          value={barcode}
          placeholder="T 1294"
          onChange={handleBarcode}
        />
        <button onClick={() => getBook(barcode)}>Load</button>
      </div>
      <div className="update-book-form">
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            value={book.title || ""}
            onChange={handleBook}
          />
          {/* <textarea name="" id="" cols="30" rows="4"></textarea> */}
          <label htmlFor="" required>
            Author
          </label>
          <input
            type="text"
            name="author"
            value={book.author || ""}
            onChange={handleBook}
          />
          <label htmlFor="">Barcode</label>
          <input
            type="text"
            name="barcode"
            value={book.barcode || ""}
            onChange={handleBook}
            id=""
          />
          <label htmlFor="">Publication Year</label>
          <input
            type="text"
            name="publicationYear"
            value={book.publicationYear || ""}
            onChange={handleBook}
          />
          <label htmlFor="">ISBN/ISSN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn || ""}
            onChange={handleBook}
          />
          <label htmlFor="">Price</label>
          <input
            type="text"
            name="price"
            value={book.price || ""}
            onChange={handleBook}
          />
        </div>
        <div>
          <label htmlFor="">Condition</label>
          <input
            type="text"
            name="condition"
            value={book.condition || ""}
            onChange={handleBook}
          />
          <label htmlFor="">Material Type</label>
          <input
            name="materialType"
            value={book.materialType || ""}
            onChange={handleBook}
          ></input>
          <label htmlFor="">Sublocation</label>
          <input
            type="text"
            name="sublocation"
            value={book.sublocation || ""}
            onChange={handleBook}
          />
          <label htmlFor="">Vendor</label>
          <input
            type="text"
            name="vendor"
            value={book.vendor || ""}
            onChange={handleBook}
          />
          <label htmlFor="">Circulation Type</label>
          <input
            name="circulationType"
            value={book.circulationType || ""}
            onChange={handleBook}
          ></input>
          <label htmlFor="">Dewey</label>
          <input
            type="text"
            name="dewey"
            value={book.dewey || ""}
            onChange={handleBook}
          />
        </div>
      </div>
      <div className="active-tools-btns">
        <button onClick={() => updateBook()}>Update</button>
        <button onClick={() => deleteBook(barcode)}>Delete</button>
      </div>
    </>
  );
}
