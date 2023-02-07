import React from "react";

export default function UpdateBook() {
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
  return (
    <>
      <h3 style={{ textAlign: "center", color: "#1a2141", paddingTop: "2%" }}>
        Load the book you want to update by entering the barcode and pressing
        the load button.
      </h3>
      <div className="update-book-form">
        <div className="col-1">
          <label htmlFor="">Title</label>
          <textarea name="" id="" cols="30" rows="6"></textarea>
          <label htmlFor="" required>
            Author
          </label>
          <input type="text" name="" id="" />
          <label
            htmlFor=""
            style={{ fontWeight: "800", fontSize: "24px" }}
            required
          >
            Barcode
          </label>
          <input type="text" name="" maxLength={4} id="" />
          <label htmlFor="">Publication Year</label>
          <input type="text" name="" id="" />
          <label htmlFor="">ISBN/ISSN</label>
          <input type="text" name="" id="" />
        </div>
        <div className="col-2">
          <label htmlFor="">Price</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Material Type</label>
          <select name="" id="">
            <option value="">Book</option>
            <option value="">Big Book</option>
            <option value="">Magazine</option>
            <option value="">Text Book</option>
          </select>
          <label htmlFor="">Sublocation</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Vendor</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Circulation Type</label>
          <select name="" id="">
            <option value="">RESOURCES</option>
            <option value="">REGULAR PRIMARY</option>
            <option value="">REGULAR SECONDARY</option>
          </select>
          <label htmlFor="">Dewey</label>
          <input type="text" name="" id="" />
        </div>
      </div>
      <div className="active-tools-btns">
        <button>Load</button>
        <button>Update</button>
      </div>
    </>
  );
}
