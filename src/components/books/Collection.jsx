import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import cover from "../../assets/cover.png";

import "../books/collection.css";

// Two components are added to this one, Spinner to manage loading times while fetching the collection, and HoveredBook to show details of a selected book from the collection.
import HoveredBook from "../books/collection/HoveredBook.jsx";
import Spinner from "../Spinner";

export default function Collection({ showNotification }) {
  // The loading variable state is declared as a flag for the spinner component, which will show while data is fetching.
  const [loading, setLoading] = useState(true);

  // The following state is declared to be used when the user selects a book and wants to display more details about it.
  const [hoveredBook, setHoveredBook] = useState(<></>);

  // A state is declared to manage the array of books which will hold the entire collection.
  const [books, setBooks] = useState([]);

  // The function loadBooks() will fetch the collection from the server's database.
  const loadBooks = async () => {
    const response = await fetch(`${hostbase}/books/search`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data could not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component loads, the collection will be loaded from the information that was fetched in the async function loadBooks()
  useEffect(() => {
    loadBooks()
      .then((res) => {
        setBooks(res.books);
      })
      .catch((e) => {
        console.log(
          e.message +
            ": " +
            "A connection to the server could not be established. Please contact ICT support."
        );
      });
  }, []);

  // While the information is being fetched from the server, the Spinner will be active and as soon the length of the array is greater than 0, the Spinner will deactivate and the collection will be displayed.
  useEffect(() => {
    if (books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  // When the information is fetched from server side and is loaded and ready to download, a button will be available to call the downloadFile() function, which will ask for confirmation after validation and create a table organizing all of the information that was previously fetched.

  const downloadFile = async function (arr, fileName) {
    if (arr.length === 0) {
      showNotification(
        "Error",
        "No available information to download. Please choose a filter and load the information."
      );
    } else {
      const confirmation = window.confirm(
        "Do you want to download the books collection?"
      );
      if (confirmation) {
        const header = Object.keys(arr[0]);

        const newArr = arr.map((entry) =>
          header.map((key) => {
            const value = entry[key];
            if (Array.isArray(value)) {
              return JSON.stringify(value);
            } else if (
              typeof value === "boolean" ||
              typeof value === "number"
            ) {
              return value;
            } else if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`;
            } else {
              return value || ""; // Replace empty values with a placeholder
            }
          })
        );

        const rows = newArr.map((entry) => entry.join(","));
        const csvContent = header.join(",") + "\r\n" + rows.join("\r\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", encodeURIComponent(fileName));
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object after the download starts
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {hoveredBook}
          <div>
            <input
              type="text"
              placeholder="To search for a book use CTRL + F"
            />
          </div>
          <div className="collection">
            {books.map((book) => (
              <>
                <div
                  className="book"
                  key={book.barcode}
                  onClick={() =>
                    setHoveredBook(
                      <>
                        <HoveredBook
                          book={book}
                          setHoveredBook={setHoveredBook}
                        />
                      </>
                    )
                  }
                >
                  <img src={cover} alt="" />
                  <div>
                    <label htmlFor="">{book.barcode}</label>
                    <label htmlFor="" id="title">
                      {book.title}
                    </label>
                    <label htmlFor="">{book.author}</label>
                  </div>
                </div>
                {/* <hr
                  style={{
                    border: "1px solid #deb865",
                  }}
                /> */}
              </>
            ))}
          </div>
          <div className="download">
            <button
              onClick={() =>
                downloadFile(books, "Knowledge Centre Books Collection")
              }
            >
              Download
            </button>
          </div>
        </>
      )}
    </div>
  );
}
