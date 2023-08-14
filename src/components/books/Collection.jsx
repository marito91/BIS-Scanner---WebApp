import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import cover from "../../assets/cover.png";

import "../books/collection.css";

// Two components are added to this one, Spinner to manage loading times while fetching the collection, and HoveredBook to show details of a selected book from the collection.
import HoveredBook from "../books/collection/HoveredBook.jsx";
import Spinner from "../Spinner";

export default function Collection({ showNotification, userType }) {
  // The loading variable state is declared as a flag for the spinner component, which will show while data is fetching.
  const [loading, setLoading] = useState(true);
  const [showCollection, setShowCollection] = useState(true);
  const [inputText, setInputText] = useState("");

  // A state is declared to manage the array of books which will hold the entire collection.
  const [books, setBooks] = useState([]);

  // The following state is declared to be used when the user selects a book and wants to display more details about it.
  const [hoveredBook, setHoveredBook] = useState(<></>);

  let handleInput = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

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

  // The following function will display the book summary for the one selected by the user. When the user clicks on one from the list, important info from the book will be shown and the collection state will be switched to false .
  function openBookSummary(book) {
    setHoveredBook(
      <>
        <HoveredBook
          book={book}
          setHoveredBook={setHoveredBook}
          setShowCollection={setShowCollection}
        />
      </>
    );
    setShowCollection(false);
  }

  // The currentPage state the user in the first page by default. It can later be modified.
  const [currentPage, setCurrentPage] = useState(1);

  // Since the collection is very big, sometimes the user will likely search for a book. That's why they can search for any book based on title, author or barcode. This will help them narrow their search.
  const filteredBooks = books.filter((entry) => {
    // setCurrentPage(1);
    if (inputText === "") {
      return true;
    } else {
      const matchesTitle = entry.title
        .toLowerCase()
        .includes(inputText.toLowerCase());
      const matchesAuthor = entry.author
        .toLowerCase()
        .includes(inputText.toLowerCase());
      const matchesBarcode = entry.barcode
        .toLowerCase()
        .includes(inputText.toLowerCase());
      // Add more conditions for other fields if needed

      return matchesTitle || matchesAuthor || matchesBarcode; // Return true if either title or author or barcode matches
    }
  });

  // This totalPages variable will determine the amount of pages to be rendered depending on the length of the collection and a max number of 20 books per page.
  const totalPages = Math.ceil(filteredBooks.length / 20);

  // This variable is the result of the calculateVisiblePages function and will determine the range of visible page numbers/buttons
  const visiblePages = calculateVisiblePages(currentPage, totalPages);

  // This function will calculate the range of visible page numbers
  function calculateVisiblePages(currentPage, totalPages) {
    const range = 2; // Number of visible pages on each side of the current page
    let start = currentPage - range;
    let end = currentPage + range;

    // Depending if the user is at the beginning or at the end of the visible pages, the range will vary
    if (start < 1) {
      start = 1;
      end = Math.min(start + range * 2, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - range * 2, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Handle page navigation
  function goToPage(page) {
    setCurrentPage(page);
  }

  // Go to the first page
  function goToFirstPage() {
    goToPage(1);
  }

  // Go to the last page
  function goToLastPage() {
    goToPage(totalPages);
  }

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * 20;
  const endIndex = Math.min(startIndex + 20, filteredBooks.length);

  // Get the books for the current page
  const booksForCurrentPage = filteredBooks.slice(startIndex, endIndex);
  // Reset the current page to the first page whenever the inputText changes
  useEffect(() => {
    setCurrentPage(1);
  }, [inputText]);

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
    //
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {showCollection ? (
            <>
              {/* <div style={{ textAlign: "center" }}>
                <input
                  style={{ fontSize: "16px" }}
                  type="text"
                  placeholder="Looking for something specific?"
                  onChange={handleInput}
                ></input>
              </div> */}
              <div className="collection">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Looking for something specific?"
                    onChange={handleInput}
                  ></input>
                </div>
                {booksForCurrentPage.map((book) => (
                  <React.Fragment key={book.barcode}>
                    <div className="book" onClick={() => openBookSummary(book)}>
                      <img src={cover} alt="" />
                      <div>
                        <label htmlFor="">{book.barcode}</label>
                        <label htmlFor="" id="title">
                          {book.title}
                        </label>
                        <label htmlFor="">{book.author}</label>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="pagination">
                {/* Render pagination controls */}
                <button disabled={currentPage === 1} onClick={goToFirstPage}>
                  {"<<"}
                </button>

                <button
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  {"<"}Previous
                </button>

                {visiblePages.map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    disabled={currentPage === page}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next{">"}
                </button>

                <button
                  disabled={currentPage === totalPages}
                  onClick={goToLastPage}
                >
                  {">>"}
                </button>
              </div>
              {userType === "admin" ? (
                <div className="download">
                  <button
                    onClick={() =>
                      downloadFile(books, "Knowledge Centre Books Collection")
                    }
                  >
                    Download Collection
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            hoveredBook
          )}
        </>
      )}
    </div>
  );
}
