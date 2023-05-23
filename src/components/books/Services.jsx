import React from "react";

import RentBook from "../books/services/RentBook";
import ReturnBook from "../books/services/ReturnBook.jsx";

import "../books/services.css";

// The Services component will include the services available for the renting and return of books, for which there are only 2 components so far.
export default function Services({ showNotification }) {
  return (
    <div className="book-services">
      <RentBook showNotification={showNotification} />
      <ReturnBook showNotification={showNotification} />
    </div>
  );
}
