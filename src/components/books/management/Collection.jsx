import React, { useState, useEffect } from "react";
import hostbase from "../../../hostbase.js";

// Two components are added to this one, Spinner to manage loading times while fetching the collection, and HoveredBook to show details of a selected book from the collection.
import HoveredBook from "./HoveredBook";
import Spinner from "./Spinner";

export default function Collection() {
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

  return (
    <div className="table-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {hoveredBook}
          <table id="collection">
            <thead>
              <tr>
                <th
                  style={{
                    borderRadius: "10px 0 0 0",
                  }}
                >
                  Title
                </th>
                <th id="toHide">Author</th>
                <th
                  style={{
                    borderRadius: "0 10px 0 0",
                  }}
                >
                  Barcode
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.barcode}>
                  <td
                    id="table-book-title"
                    style={{ maxWidth: "360px" }}
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
                    {book.title}
                  </td>
                  <td id="toHide">{book.author}</td>
                  <td>{book.barcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
