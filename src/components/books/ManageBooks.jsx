import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import hostbase from "../../hostbase.js";

import load from "../../assets/load.svg";
import upload from "../../assets/upload.svg";
import editalt from "../../assets/editalt.svg";
import clear from "../../assets/clear.svg";
import trash from "../../assets/trash.svg";
import close from "../../assets/x.svg";

export default function ManageBooks({
  showNotification,
  admin,
  closeBookEditModal,
}) {
  // First, a state is set for the barcode string, which will help for searching in server.
  const [barcode, setBarcode] = useState("");

  const token = localStorage.getItem("token");
  const loggedUser = jwtDecode(token);
  const name = loggedUser.first + " " + loggedUser.last;

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
    conditions: "",
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
      body: JSON.stringify({ barcode, name }),
    })
      .then((res) => res.json())
      .then((res) => {
        // If the book is found and response from server is ok, an alert will be displayed and the book object will be updated with the information fetched.
        if (res.status === "ok") {
          showNotification("Success", res.msg);
          setBook(res.bookExists);
          // If the information is not found, then an alert will be displayed.
        } else {
          showNotification("Error", res.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
        showNotification(
          "Error",
          "A connection with the server could not be established when trying to search for a book. Please contact ICT support."
        );
      });
  }

  // The updateBook() function will send to the server all of the information to be updated in a book that's part of the collection and that's been already loaded in the fields. The book object's information is sent to the server which then validates with the database and updates based on the new data.
  function updateBook() {
    if (book.title === "") {
      showNotification("Alert", "Please load a book first!");
    } else {
      const confirm = window.confirm(
        "Are you sure you want to update this book?"
      );
      if (confirm) {
        fetch(`${hostbase}/books/update`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ book, name }),
        })
          .then((res) => res.json())
          .then((res) => {
            // If the book is updated in the database and the response from the server is ok, an alert will be displayed and the book object will be set to default again.
            if (res.status === "ok") {
              showNotification("Success", res.msg);
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
                conditions: "",
              });
              // If the above doesn't work, and the status is Error, then an alert is displayed.
            } else {
              showNotification("Error", res.msg);
            }
          })
          // If the connection with the server doesn't work then a message is displayed.
          .catch(function (error) {
            console.log(error);
            showNotification(
              "Error",
              "A connection with the server could not be established when trying to update a book. Please contact ICT support."
            );
          });
      }
    }
  }

  // The deleteBook() function will send to the server the requested book's barcode that's part of the collection and that's been already loaded in the fields. The book object's information is sent to the server which then validates with the database and deletes it.
  function deleteBook(barcode) {
    // Many validations and confirmations are done first since deleting a book is a big deal.
    if (book.title === "") {
      showNotification("Alert", "Please load a book first!");
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
            body: JSON.stringify({ barcode, name }),
          })
            .then((res) => res.json())
            .then((res) => {
              // If the book is deleted in the database and the response from the server is ok, an alert will be displayed and the book object will be set to default again.
              if (res.status === "ok") {
                showNotification("Success", res.msg);
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
                  conditions: "",
                });
                // If the above doesn't work, and the status is Error, then an alert is displayed.
              } else {
                showNotification("Error", res.msg);
              }
            })
            // If the connection with the server doesn't work then a message is displayed.
            .catch(function (error) {
              console.log(error);
              showNotification(
                "Error",
                "A connection with the server could not be established when trying to delete a book. Please contact ICT support."
              );
            });
        }
      }
    }
  }

  // Finally, the function insertNewBook() will send all of the information to the server after going through different validations first.
  function insertNewBook() {
    if (book.title === "") {
      showNotification("Alert", "Please load a book first!");
    } else {
      // Since most of the inputs are required, the function can go through a confirmation first.
      const confirm = window.confirm(
        `Do you want to create a new entry in the database for the book ${book.title}`
      );
      if (confirm) {
        // After confirming, then the select fields will be validated.
        if (book.materialType === "- Choose one -") {
          showNotification("Alert", "Please enter the Material Type ");
        } else if (book.circulationType === "- Choose one") {
          showNotification("Alert", "Please enter the Circulation Type ");
        } else if (isNaN(book.price)) {
          showNotification(
            "Error",
            "Please enter a valid price. If N/A enter 0"
          );
        } else {
          // If everything is ok, then the information will be sent to the server.
          fetch(`${hostbase}/books/new-book`, {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ book, name }),
          })
            .then((res) => res.json())
            .then((res) => {
              // If everything turns ok in the server, an alert with the message is displayed and the book object's values are set to default.
              if (res.status === "ok") {
                showNotification("Success", res.msg);
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
                  conditions: "",
                });
              } else {
                // If the creation of a new book in database is not successful, then only a message will be displayed through an alert.
                showNotification("Error", res.msg);
              }
            })
            .catch(function () {
              // If there is an error in the communication with the server, an alert will be shown.
              showNotification(
                "Error",
                "A connection with the server could not be established while trying to insert a new book. Please contact ICT Support."
              );
            });
        }
      }
    }
  }

  function clearFields() {
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
      conditions: "",
    });
  }

  return (
    <>
      <div className="manage-form">
        <h3>Manage Books</h3>
        <div className="book-loader">
          <label htmlFor="">Barcode:</label>
          <input
            type="text"
            name="barcode"
            value={barcode}
            placeholder="T 1294"
            onChange={handleBarcode}
          />
          {/* <button onClick={() => getBook(barcode)}>Load</button> */}
          <button className="btn-container" onClick={() => getBook(barcode)}>
            <div className="button-content">
              <img src={load} alt="" className="button-icon" />
              <span className="button-text">Load</span>
            </div>
          </button>
        </div>
        <div className="manage-books-form">
          <div className="mb-form-col-1">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              value={book.title || ""}
              onChange={handleBook}
            />
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
          <div className="mb-form-col-2">
            <label htmlFor="">Condition</label>
            <input
              type="text"
              name="conditions"
              value={book.conditions || ""}
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
            <label htmlFor="">BISAC</label>
            <input
              type="text"
              name="dewey"
              value={book.dewey || ""}
              onChange={handleBook}
            />
          </div>
        </div>
        <div className="book-actions">
          <button className="btn-container" onClick={() => insertNewBook()}>
            <div className="button-content">
              <img src={upload} alt="" className="button-icon" />
              <span className="button-text">Insert</span>
            </div>
          </button>
          <button className="btn-container" onClick={() => updateBook()}>
            <div className="button-content">
              <img src={editalt} alt="" className="button-icon" />
              <span className="button-text">Update</span>
            </div>
          </button>
          <button className="btn-container" onClick={() => clearFields()}>
            <div className="button-content">
              <img src={clear} alt="" className="button-icon" />
              <span className="button-text">Clear</span>
            </div>
          </button>
          <button className="btn-container" onClick={() => deleteBook()}>
            <div className="button-content">
              <img src={trash} alt="" className="button-icon" />
              <span className="button-text">Delete</span>
            </div>
          </button>
        </div>
        <div className="close-button-container">
          <img src={close} alt="" onClick={() => closeBookEditModal(false)} />
        </div>
      </div>
    </>
  );
}
