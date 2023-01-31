import React from "react";

import title from "../../../assets/book-icons/title.png";
import author from "../../../assets/book-icons/author.png";
import barcode from "../../../assets/book-icons/barcode.png";
import isbn from "../../../assets/book-icons/isbn.png";
import price from "../../../assets/book-icons/price.png";
import calendar from "../../../assets/book-icons/calendar.png";
import material from "../../../assets/book-icons/material.png";
import location from "../../../assets/book-icons/location.png";
import vendor from "../../../assets/book-icons/vendor.png";
import circulation from "../../../assets/book-icons/circulation.png";
import dewey from "../../../assets/book-icons/dewey.png";
import rented from "../../../assets/book-icons/rented.png";

export default function SearchBook() {
  return (
    <div>
      <form action="">
        <div className="col-1">
          <label htmlFor="">Title</label>
          <textarea name="" id="" cols="28" rows="4"></textarea>
          <label htmlFor="">Author</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Barcode</label>
          <input type="text" name="" maxLength={4} id="" />
        </div>
        <div className="col-2">
          <div>
            <img src={title} alt="" />
            <label htmlFor="">
              Title of the book is very long so i have to see if it works in css
            </label>
          </div>
          <div>
            <img src={author} alt="" />
            <label htmlFor="">Author</label>
          </div>
          <div>
            <img src={barcode} alt="" />
            <label htmlFor="">Barcode</label>
          </div>
          <div>
            <img src={isbn} alt="" />
            <label htmlFor="">ISBN/ISSN</label>
          </div>
          <div>
            <img src={price} alt="" />
            <label htmlFor="">Price</label>
          </div>
          <div>
            <img src={calendar} alt="" />
            <label htmlFor="">Publication Year</label>
          </div>
        </div>
        <div className="col-3">
          <div>
            <img src={material} alt="" />
            <label htmlFor="">Material Type</label>
          </div>
          <div>
            <img src={location} alt="" />
            <label htmlFor="">Sublocation</label>
          </div>
          <div>
            <img src={vendor} alt="" />
            <label htmlFor="">Vendor</label>
          </div>
          <div>
            <img src={circulation} alt="" />
            <label htmlFor="">Circulation Type</label>
          </div>
          <div>
            <img src={dewey} alt="" />
            <label htmlFor="">Dewey</label>
          </div>
          <div>
            <img src={rented} alt="" />
            <label htmlFor="">Currently rented</label>
          </div>
        </div>
      </form>
      <div className="active-tools-btns">
        <button>Search</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
