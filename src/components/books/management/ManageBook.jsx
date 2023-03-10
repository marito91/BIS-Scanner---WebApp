import React, { useState } from "react";
import hostbase from "../../../hostbase.js";

export default function ManageBook() {
  // First, a state is set for the barcode string, which will help for searching in server.
  const [barcode, setBarcode] = useState("");

  // Then, an object which will contain the book information is created. All values are set to null in the initial state.
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

  // The function handleBarcode() will manage the input field for the barcode value.
  const handleBarcode = (event) => {
    const value = event.target.value;
    setBarcode(value);
  };

  // The function handleBook() will manage all of the inputs and select fields in the form regarding the book that is searched.
  const handleBook = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook((book) => ({ ...book, [name]: value }));
  };

  // The getBook() function will receive a barcode as params and will use it to search in the database on the server for the book requested.
  function getBook(barcode) {
    fetch(`${hostbase}/books/getBook`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ barcode }),
    })
      .then((res) => res.json())
      .then((res) => {
        // If the book is found and response from server is ok, an alert will be displayed and the book object will be updated with the information fetched.
        if (res.status === "ok") {
          alert(res.msg);
          setBook(res.bookExists);
          // If the information is not found, then an alert will be displayed.
        } else {
          alert(res.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "A connection with the server could not be established when trying to search for a book. Please contact ICT support."
        );
      });
  }

  // The updateBook() function will send to the server all of the information to be updated in a book that's part of the collection and that's been already loaded in the fields. The book object's information is sent to the server which then validates with the database and updates based on the new data.
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
          // If the book is updated in the database and the response from the server is ok, an alert will be displayed and the book object will be set to default again.
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
            // If the above doesn't work, and the status is Error, then an alert is displayed.
          } else {
            alert(res.msg);
          }
        })
        // If the connection with the server doesn't work then a message is displayed.
        .catch(function (error) {
          console.log(error);
          alert(
            "A connection with the server could not be established when trying to update a book. Please contact ICT support."
          );
        });
    }
  }

  // The deleteBook() function will send to the server the requested book's barcode that's part of the collection and that's been already loaded in the fields. The book object's information is sent to the server which then validates with the database and deletes it.
  function deleteBook(barcode) {
    // Many validations and confirmations are done first since deleting a book is a big deal.
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
              // If the book is deleted in the database and the response from the server is ok, an alert will be displayed and the book object will be set to default again.
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
                // If the above doesn't work, and the status is Error, then an alert is displayed.
              } else {
                alert(res.msg);
              }
            })
            // If the connection with the server doesn't work then a message is displayed.
            .catch(function (error) {
              console.log(error);
              alert(
                "A connection with the server could not be established when trying to delete a book. Please contact ICT support."
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
