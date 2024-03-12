import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import cover from "../../assets/cover.png";
import download from "../../assets/download.svg";
import dots from "../../assets/dots.svg";
import star from "../../assets/star.svg";
import starFilled from "../../assets/star-filled.svg";

// One componentis added, Spinner to manage loading times while fetching the collection.
import Spinner from "../Spinner";

export default function Collection({ showNotification, userType }) {
  // The loading variable state is declared as a flag for the spinner component, which will show while data is fetching.
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");

  // A state is declared to manage the array of books which will hold the entire collection.
  const [books, setBooks] = useState([]);

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

  // State to manage the favorite status for each book
  const [favorites, setFavorites] = useState(() => {
    const initialFavorites = {};
    books.forEach((book) => {
      initialFavorites[book.barcode] = false;
    });
    return initialFavorites;
  });

  // Function to toggle favorite for a specific book
  const toggleFavorite = (barcode) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      newFavorites[barcode] = !newFavorites[barcode];
      return newFavorites;
    });
  };

  return (
    //
    <div>
      {loading ? (
        <Spinner message={"Loading collection. This may take some time."} />
      ) : (
        <>
          {/* {showCollection ? ( */}
          <div className="search-input">
            <input
              type="text"
              placeholder="Looking for something specific?"
              onChange={handleInput}
            ></input>
          </div>
          <div className="headers-row">
            <div className="book">
              <h4>Book</h4>
            </div>
            <div className="barcode">
              <h4>Barcode</h4>
            </div>
            <div className="location">
              <h4>Location</h4>
            </div>
            <div className="available">
              <h4>Available</h4>
            </div>
            {/* <div className="icons">
              <h4>Quick actions</h4>
            </div> */}
          </div>
          <div className="collection-container">
            {booksForCurrentPage.map((book) => (
              <React.Fragment key={book.barcode}>
                <div
                  className="book-row"
                  // onClick={() => openBookSummary(book)}
                >
                  <div
                    className="book-main-info"
                    // onClick={() => console.log(book)}
                  >
                    <img src={cover} alt="" />
                    <div>
                      <label htmlFor="" id="book-title">
                        {book.title}
                      </label>
                      <label htmlFor="">{book.author}</label>
                      <label htmlFor="" id="book-date">
                        {book.publicationYear}
                      </label>
                    </div>
                  </div>
                  <div className="book-barcode">
                    <label htmlFor="">{book.barcode}</label>
                  </div>
                  <div className="book-location">{book.sublocation}</div>
                  <div className="book-available">
                    {!book.available
                      ? `Rented by ${book.userDocument}`
                      : " Yes"}
                  </div>
                  {/* <div className="book-icons">
                    {favorites[book.barcode] ? (
                      <img
                        src={starFilled}
                        alt=""
                        id="star"
                        onClick={() => {
                          toggleFavorite(book.barcode);
                        }}
                      />
                    ) : (
                      <img
                        src={star}
                        alt=""
                        id="star"
                        onClick={() => {
                          toggleFavorite(book.barcode);
                        }}
                      />
                    )}
                    <img src={dots} alt="" id="dots" />
                  </div> */}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="collection-tools">
            {/* Render pagination controls */}
            <div className="pagination">
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
              <div className="collection-btn">
                <button
                  className="btn-container"
                  onClick={() => downloadFile()}
                >
                  <div className="button-content">
                    <img src={download} alt="" className="button-icon" />
                    <span className="button-text">Download Collection</span>
                  </div>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
        // ) : (
        //   hoveredBook
        // )}
      )}
    </div>
  );
}
