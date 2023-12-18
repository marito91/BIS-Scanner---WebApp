import React, { useState } from "react";
import jwtDecode from "jwt-decode";
// import hostbase from "../hostbase.js";

import BooksDashboard from "./books/BooksDashboard.jsx";
import RentBook from "./books/RentBook.jsx";
import ReturnBook from "./books/ReturnBook.jsx";
import ManageBooks from "./books/ManageBooks.jsx";
import Collections from "./books/Collections.jsx";

import "./books/newbooks.css";

export default function Books({ showNotification }) {
  // User is being checked to see what tools are going to be available for them.
  const token = localStorage.getItem("token");
  const loggedUser = jwtDecode(token);
  const userType = loggedUser.userType;
  const admin = loggedUser.first + " " + loggedUser.last;

  //   // A state is declared which will hold the active component for the books section. It is set to the collection by default.
  //   const [activeTool, setActiveTool] = useState("collection");

  // For managing the renting modal
  const [rentModalIsVisible, setRentModalIsVisible] = useState(false);
  function closeRentModal() {
    setRentModalIsVisible(false);
  }

  // For managing the return modal
  const [returnModalIsVisible, setReturnModalIsVisible] = useState(false);
  function closeReturnModal() {
    setReturnModalIsVisible(false);
  }

  // For managing the book edition modal
  const [bookEditModalIsVisible, setBookEditModalIsVisible] = useState(false);
  function closeBookEditModal() {
    setBookEditModalIsVisible(false);
  }

  return (
    <>
      <div
        className={`books-section ${
          rentModalIsVisible || returnModalIsVisible || bookEditModalIsVisible
            ? "dimmed-background"
            : ""
        }`}
      >
        <BooksDashboard
          admin={admin}
          showNotification={showNotification}
          setRentModalIsVisible={setRentModalIsVisible}
          setReturnModalIsVisible={setReturnModalIsVisible}
          setBookEditModalIsVisible={setBookEditModalIsVisible}
        />
        <Collections userType={userType} showNotification={showNotification} />
      </div>
      <div className={`rent-modal ${rentModalIsVisible ? "visible" : ""}`}>
        <RentBook
          showNotification={showNotification}
          admin={admin}
          closeRentModal={closeRentModal}
        />
      </div>
      <div className={`rent-modal ${returnModalIsVisible ? "visible" : ""}`}>
        <ReturnBook
          showNotification={showNotification}
          admin={admin}
          closeReturnModal={closeReturnModal}
        />
      </div>
      <div className={`rent-modal ${bookEditModalIsVisible ? "visible" : ""}`}>
        <ManageBooks
          showNotification={showNotification}
          admin={admin}
          closeBookEditModal={closeBookEditModal}
        />
      </div>
    </>
  );
}
