import React, { useState, useEffect } from "react";
import hostbase from "../../../hostbase.js";

import HoveredBook from "./HoveredBook";
import Spinner from "./Spinner";

export default function Collection() {
  const [loading, setLoading] = useState(true);
  const [hoveredBook, setHoveredBook] = useState(<></>);

  const [books, setBooks] = useState([]);

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

  useEffect(() => {
    loadBooks()
      .then((res) => {
        setBooks(res.books);
      })
      .catch((e) => {
        console.log(e.message);
        alert(
          "A connection to the server could not be established. Please contact ICT support."
        );
      });
  }, [books]);

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
                <th>Author</th>
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
                <>
                  <tr key={book}>
                    <td
                      key={book.title}
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
                    <td key={book.author}>{book.author}</td>
                    <td key={book.barcode}>{book.barcode}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
