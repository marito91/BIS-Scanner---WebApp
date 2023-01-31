import React, { useState } from "react";
// import hostbase from "../hostbase.js";

import Management from "./books/Management.jsx";
import Services from "./books/Services.jsx";
import Circulation from "./books/Circulation.jsx";

import "./books/books.css";

// import book from "../assets/book.png";
// import library from "../assets/library.png";
// import list from "../assets/list.png";

export default function Books({ user, setUser }) {
  const [section, setSection] = useState(<></>);
  return (
    <div className="books-section">
      <div className="left-panel">
        <button
          onClick={() =>
            setSection(<Management user={user} setUser={setUser} />)
          }
        >
          Library Management
        </button>
        <button
          onClick={() => setSection(<Services user={user} setUser={setUser} />)}
        >
          Services
        </button>
        <button
          onClick={() =>
            setSection(<Circulation user={user} setUser={setUser} />)
          }
        >
          Circulation
        </button>
      </div>
      <div className="active-tool">{section}</div>
    </div>
  );
}
