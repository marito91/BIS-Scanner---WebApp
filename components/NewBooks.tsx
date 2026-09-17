"use client";

import { useState } from "react";

import type { SessionUser } from "../lib/auth";
import { useAppState } from "./AppStateProvider";

import BooksDashboard from "./books/BooksDashboard";
import RentBook from "./books/RentBook";
import ReturnBook from "./books/ReturnBook";
import ManageBooks from "../src/components/books/ManageBooks.jsx";
import Collections from "./books/Collections";

import "../src/components/books/newbooks.css";

interface NewBooksProps {
  loggedUser: SessionUser;
}

export default function NewBooks({ loggedUser }: NewBooksProps) {
  // User is being checked to see what tools are going to be available for them.
  const { showNotification } = useAppState();
  const userType = loggedUser.userType;
  const admin = loggedUser.first + " " + loggedUser.last;

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
