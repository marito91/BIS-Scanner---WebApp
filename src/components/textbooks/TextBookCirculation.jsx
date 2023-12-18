import React, { useState, useEffect } from "react";
import Spinner from "../Spinner.jsx";

import SelectedTextbook from "./SelectedTextbook.jsx";

export default function TextBookCirculation({
  showNotification,
  admin,
  rentedTextbooks,
}) {
  // The loading variable state is declared as a flag for the spinner component, which will show while data is fetching.
  const [loading, setLoading] = useState(true);

  // While the information is being fetched from the server, the Spinner will be active and as soon the length of the array is greater than 0, the Spinner will deactivate and the collection will be displayed.
  useEffect(() => {
    if (rentedTextbooks.length > 0) {
      setLoading(false);
    }
  }, [rentedTextbooks]);

  const downloadFile = async function (arr, fileName) {
    if (arr.length === 0) {
      showNotification(
        "Error",
        "No available information to download. Please choose a filter and load the information."
      );
    } else {
      const confirmation = window.confirm(
        "Do you want to download the complete list of rented textbooks?"
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

  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  MANAGE LIST OF RENTED TEXTBOOKS // // // // // // // //
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
  const [showList, setShowList] = useState(true);
  const [inputText, setInputText] = useState("");

  // The following state is declared to be used when the user selects a book and wants to display more details about it.
  const [selectedTextbook, setSelectedTextbook] = useState(<></>);

  let handleInput = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // While the information is being fetched from the server, the Spinner will be active and as soon the length of the array is greater than 0, the Spinner will deactivate and the collection will be displayed.
  useEffect(() => {
    if (rentedTextbooks.length > 0) {
      setLoading(false);
    }
  }, [rentedTextbooks]);

  // The following function will display the book summary for the one selected by the user. When the user clicks on one from the list, important info from the book will be shown and the collection state will be switched to false .
  function openTextbookSummary(textbook) {
    setSelectedTextbook(
      <>
        <SelectedTextbook
          textbook={textbook}
          setSelectedTextbook={setSelectedTextbook}
          setShowList={setShowList}
        />
      </>
    );
    setShowList(false);
    setInputText("");
  }

  // The currentPage state the user in the first page by default. It can later be modified.
  const [currentPage, setCurrentPage] = useState(1);

  // Since the collection is very big, sometimes the user will likely search for a book. That's why they can search for any book based on title, author or barcode. This will help them narrow their search.
  const filteredTextbooks = rentedTextbooks.filter((entry) => {
    if (inputText === "") {
      return true;
    } else {
      const matchesName = entry.name
        .toLowerCase()
        .includes(inputText.toLowerCase());
      const matchesLastName = entry.lastName
        .toLowerCase()
        .includes(inputText.toLowerCase());
      const matchesGrade = entry.grade
        .toLowerCase()
        .includes(inputText.toLowerCase());
      const matchesDocument =
        typeof document === "number"
          ? String(entry.document).includes(inputText.toLowerCase())
          : false;

      if (entry.textbooks && Array.isArray(entry.textbooks)) {
        const matchesTextbooks = entry.textbooks.some((textbook) => {
          // Convert the number to a string before performing comparison
          const matchesTitle = String(textbook.title)
            .toLowerCase()
            .includes(inputText.toLowerCase());

          // Check if the 'sample' property is a number
          const matchesSample =
            typeof textbook.sample === "number"
              ? String(textbook.sample).includes(inputText.toLowerCase())
              : false;

          const matchesDateRented = String(textbook.dateRented)
            .toLowerCase()
            .includes(inputText.toLowerCase());

          // Add more conditions for other fields if needed

          return matchesTitle || matchesSample || matchesDateRented;
        });

        if (matchesTextbooks) {
          return true;
        }
      }

      return matchesName || matchesLastName || matchesGrade || matchesDocument;
    }
  });

  // This totalPages variable will determine the amount of pages to be rendered depending on the length of the collection and a max number of 20 books per page.
  const totalPages = Math.ceil(filteredTextbooks.length / 20);

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
  const endIndex = Math.min(startIndex + 20, filteredTextbooks.length);

  // Get the books for the current page
  const textbooksForCurrentPage = filteredTextbooks.slice(startIndex, endIndex);
  // Reset the current page to the first page whenever the inputText changes
  useEffect(() => {
    setCurrentPage(1);
  }, [inputText]);

  return (
    <>
      {loading ? (
        <Spinner message={"Loading collection. This may take some time."} />
      ) : (
        <div className="tb-circulation">
          {showList ? (
            <>
              <h1 style={{ fontWeight: "bolder" }}>Rented Textbooks</h1>
              <div className="tb-search-bar">
                <input
                  type="text"
                  placeholder="Search for a student, class, document or textbook"
                  onChange={handleInput}
                ></input>
              </div>
              <div className="tb-list">
                {textbooksForCurrentPage.map((tb) => (
                  <React.Fragment key={tb.document}>
                    <div
                      className="textbook"
                      onClick={() => openTextbookSummary(tb)}
                    >
                      {/* <img src={cover} alt="" /> */}
                      <div>
                        <label htmlFor="">{tb.grade + " " + tb.section}</label>
                        <label htmlFor="" id="">
                          {tb.name + " " + tb.lastName}
                        </label>
                        <label htmlFor="">
                          {tb.textbooks.length + " Textbooks rented"}
                        </label>
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
              {admin.userType === "admin" ? (
                <div className="download">
                  <button
                    onClick={() =>
                      downloadFile(
                        rentedTextbooks,
                        "Knowledge Centre Books Collection"
                      )
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
            selectedTextbook
          )}
        </div>
      )}
    </>
  );
}
