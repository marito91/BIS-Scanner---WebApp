import React from "react";

import RentBook from "../books/services/RentBook";
import ReturnBook from "../books/services/ReturnBook.jsx";

import "../books/services.css";

export default function Services({ user, setUser }) {
  return (
    <div className="book-services">
      <RentBook />
      <ReturnBook />
    </div>
  );
}
