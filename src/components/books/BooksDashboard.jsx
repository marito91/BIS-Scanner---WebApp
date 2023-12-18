import React from "react";

import rent from "../../assets/rent.svg";
import giveBack from "../../assets/return.svg";
import edit from "../../assets/edit.svg";
import read from "../../assets/read.svg";

export default function BooksDashboard({
  admin,
  showNotification,
  setRentModalIsVisible,
  setReturnModalIsVisible,
  setBookEditModalIsVisible,
}) {
  return (
    <>
      <div className="book-dashboard-container">
        <h3>Knowledge Centre Books</h3>
        <div className="container-info">
          <div className="tools">
            <button
              className="btn-container"
              onClick={() => setRentModalIsVisible(true)}
            >
              <div className="button-content">
                <img src={rent} alt="" className="button-icon" />
                <span className="button-text">New Rent</span>
              </div>
            </button>
            <button
              className="btn-container"
              onClick={() => setReturnModalIsVisible(true)}
            >
              <div className="button-content">
                <img src={giveBack} alt="" className="button-icon" />
                <span className="button-text">Return</span>
              </div>
            </button>
            <button
              className="btn-container"
              onClick={() => setBookEditModalIsVisible(true)}
            >
              <div className="button-content">
                <img src={edit} alt="" className="button-icon" />
                <span className="button-text">Edit Books</span>
              </div>
            </button>
          </div>
          <div>
            <img src={read} id="reading" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
