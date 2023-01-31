import React, { useState } from "react";

import NewBook from "../books/management/NewBook.jsx";
import SearchBook from "../books/management/SearchBook.jsx";
import UpdateBook from "../books/management/UpdateBook.jsx";
import DeleteBook from "../books/management/DeleteBook.jsx";

import "../books/management.css";

export default function Management() {
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
   */

  const [tool, setTool] = useState(<></>);
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
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook((book) => ({ ...book, [name]: value }));
  };
  return (
    <div className="book-management">
      <div className="book-tools-buttons">
        <button
          onClick={() =>
            setTool(<NewBook book={book} handleChange={handleChange} />)
          }
        >
          Insert
        </button>
        <button
          onClick={() => setTool(<UpdateBook book={book} setBook={setBook} />)}
        >
          Edit
        </button>
        <button
          onClick={() => setTool(<SearchBook book={book} setBook={setBook} />)}
        >
          Search
        </button>
        {/* <button
          onClick={() => setTool(<DeleteBook book={book} setBook={setBook} />)}
        >
          Delete
        </button> */}
      </div>
      <div className="selected-book-tool">{tool}</div>
    </div>
  );
}
