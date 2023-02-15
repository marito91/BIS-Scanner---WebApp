import React from "react";

import title from "../../../assets/book-icons/title.png";
import author from "../../../assets/book-icons/author.png";
import barcodeImg from "../../../assets/book-icons/barcode.png";
import isbn from "../../../assets/book-icons/isbn.png";
import price from "../../../assets/book-icons/price.png";
import calendar from "../../../assets/book-icons/calendar.png";
import material from "../../../assets/book-icons/material.png";
import location from "../../../assets/book-icons/location.png";
import vendor from "../../../assets/book-icons/vendor.png";
import circulation from "../../../assets/book-icons/circulation.png";
import dewey from "../../../assets/book-icons/dewey.png";
import condition from "../../../assets/book-icons/condition.png";
import close from "../../../assets/x.svg";

export default function HoveredBook({ book, setHoveredBook }) {
  return (
    <div className="hovered-item">
      <img
        src={close}
        className="close-img"
        alt=""
        onClick={() => setHoveredBook(<></>)}
      />
      <div className="hovered-book">
        <div className="hovered-column">
          <div>
            <img src={title} alt="" />
            <label htmlFor="">{book.title}</label>
          </div>
          <div>
            <img src={author} alt="" />
            <label htmlFor="">{book.author}</label>
          </div>
          <div>
            <img src={barcodeImg} alt="" />
            <label htmlFor="">{book.barcode}</label>
          </div>
          <div>
            <img src={isbn} alt="" />
            <label htmlFor="">{book.isbn}</label>
          </div>
          <div>
            <img src={price} alt="" />
            <label htmlFor="">{`$${book.price} pesos`}</label>
          </div>
          <div>
            <img src={calendar} alt="" />
            <label htmlFor="">{book.publicationYear}</label>
          </div>
        </div>
        <div className="hovered-column">
          <div>
            <img src={material} alt="" />
            <label htmlFor="">{book.materialType}</label>
          </div>
          <div>
            <img src={location} alt="" />
            <label htmlFor="">{book.sublocation}</label>
          </div>
          <div>
            <img src={vendor} alt="" />
            <label htmlFor="">{book.vendor}</label>
          </div>
          <div>
            <img src={circulation} alt="" />
            <label htmlFor="">{book.circulationType}</label>
          </div>
          <div>
            <img src={dewey} alt="" />
            <label htmlFor="">{book.dewey}</label>
          </div>
          <div>
            <img src={condition} alt="" />
            <label htmlFor="">{book.condition}</label>
          </div>
        </div>
      </div>
      {/* <div className="hovered-book-btn">
        <button src={close} onClick={() => setHoveredBook(<></>)}>
          Close
        </button>
      </div> */}
    </div>
  );
}
