import React from "react";

// All of the corresponding media to make the details easier to read is imported.
import cover from "../../../assets/cover.png";

import "../../books/collection.css";

// Since the component needs information that's passed from the parent, the props for book and setHoveredBook are passed. The details will be extracted from the book's keys, and the setHoveredBook will be used to being set to null when closing the window.
export default function HoveredBook({ book, setHoveredBook }) {
  // const dueDate = book.rentalHistory[book.rentalHistory.length - 1].dueDate;
  const dueDate =
    book.rentalHistory && book.rentalHistory.length > 0
      ? book.rentalHistory[book.rentalHistory.length - 1].dueDate
      : undefined;

  console.log(book);
  return (
    <>
      <div className="selected-book" style={{ textAlign: "center" }}>
        {/* <h2>Book Details</h2> */}
        <img id="book-cover" src={cover} alt="" />
      </div>
      <div className="hovered-item">
        <div className="book-info">
          <label htmlFor="" id="title">
            {book.title}
          </label>
          <label htmlFor="" id="author">
            {book.author}
          </label>
        </div>
        <div className="book-main">
          <div>
            <label htmlFor="" id="info">
              {book.publicationYear}
            </label>
            <label htmlFor="" id="info-2">
              Release
            </label>
          </div>
          <hr
            style={{
              border: "1px solid #deb865",
            }}
          />
          <div>
            <label htmlFor="" id="info">
              {book.sublocation}
            </label>
            <label htmlFor="" id="info-2">
              Location
            </label>
          </div>
          <hr
            style={{
              border: "1px solid #deb865",
            }}
          />
          <div>
            <label htmlFor="" id="info">
              {book.barcode}
            </label>
            <label htmlFor="" id="info-2">
              Barcode
            </label>
          </div>
        </div>
        <div className="summary">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            dolores quidem quis porro doloribus, libero vel minima possimus odio
            earum quaerat quo sunt exercitationem deserunt delectus error.
            Eaque, consequatur quisquam.
          </p>
          {/* <h4>Available to rent: {!book.available ? dueDate : "Yes"}</h4> */}
          <h4>
            Available to rent:
            {!book.available ? (dueDate ? " " + dueDate : "N/A") : " Yes"}
          </h4>
        </div>
        <div className="download" style={{ margin: "20px 0 20px 0" }}>
          <button onClick={() => setHoveredBook(<></>)}>Close</button>
        </div>
      </div>
    </>
  );
}
