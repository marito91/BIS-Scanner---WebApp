import React, { useState } from "react";
// import hostbase from "../hostbase.js";

import Management from "./books/Management.jsx";
import Services from "./books/Services.jsx";
import Circulation from "./books/Circulation.jsx";
import Collection from "./books/Collection.jsx";

import "./books/books.css";

// import book from "../assets/book.png";
// import library from "../assets/library.png";
// import list from "../assets/list.png";

export default function Books({ showNotification }) {
  // A state is declared which will hold the active component for the books section.
  const [section, setSection] = useState(<></>);
  return (
    <div className="books-section">
      <div className="left-panel">
        <button
          onClick={() =>
            setSection(<Management showNotification={showNotification} />)
          }
        >
          Library Management
        </button>
        <button
          onClick={() =>
            setSection(<Collection showNotification={showNotification} />)
          }
        >
          Collection
        </button>
        <button
          onClick={() =>
            setSection(<Services showNotification={showNotification} />)
          }
        >
          Services
        </button>
        <button
          onClick={() =>
            setSection(<Circulation showNotification={showNotification} />)
          }
        >
          Circulation
        </button>
      </div>
      <div className="active-tool">{section}</div>
    </div>
  );
}
