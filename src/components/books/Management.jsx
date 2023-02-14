import React, { useState /*, useEffect*/ } from "react";
// import hostbase from "../../hostbase.js";

import NewBook from "../books/management/NewBook.jsx";
// import DeleteBook from "../books/management/DeleteBook.jsx";
import ManageBook from "../books/management/ManageBook.jsx";
import Collection from "../books/management/Collection.jsx";

import "../books/management.css";

export default function Management() {
  const [tool, setTool] = useState(
    <>
      <h1>Please select a tool to work with!</h1>
    </>
  );

  // const [books, setBooks] = useState([]);

  // const loadBooks = async () => {
  //   const response = await fetch(`${hostbase}/books/search`, {
  //     headers: { "content-type": "application/json" },
  //     method: "GET",
  //   });
  //   if (!response.ok) {
  //     throw new Error("Data could not be fetched!");
  //   } else {
  //     return response.json();
  //   }
  // };

  // useEffect(() => {
  //   loadBooks()
  //     .then((res) => {
  //       setBooks(res.books);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //       alert(
  //         "A connection to the server could not be established. Please contact ICT support."
  //       );
  //     });
  // }, [books]);

  return (
    <div className="book-management">
      <div className="book-tools-buttons">
        <button onClick={() => setTool(<NewBook />)}>Insert</button>
        <button onClick={() => setTool(<ManageBook />)}>Edit</button>
        {/* <button
          onClick={() =>
            setTool(
              <DeleteBook
                book={book}
                setBook={setBook}
                getBook={getBook}
                handleBook={handleBook}
              />
            )
          }
        >
          Delete
        </button> */}
        <button onClick={() => setTool(<Collection />)}>Collection</button>
      </div>
      <div className="selected-book-tool">{tool}</div>
    </div>
  );
}
