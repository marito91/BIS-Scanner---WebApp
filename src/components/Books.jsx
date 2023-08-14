import React, { useState } from "react";
import jwtDecode from "jwt-decode";
// import hostbase from "../hostbase.js";

import Management from "./books/Management.jsx";
import Services from "./books/Services.jsx";
import TextBooks from "./books/TextBooks.jsx";
import Circulation from "./books/Circulation.jsx";
import Collection from "./books/Collection.jsx";

import "./books/books.css";

export default function Books({ showNotification }) {
  // User is being checked to see what tools are going to be available for them.
  const token = localStorage.getItem("token");
  const loggedUser = jwtDecode(token);
  const userType = loggedUser.userType;

  // A state is declared which will hold the active component for the books section. It is set to the collection by default.
  const [activeTool, setActiveTool] = useState("collection");

  return (
    <div className="books-section">
      <div className="left-panel">
        <h1>Tools</h1>
        <button
          className={activeTool === "management" ? "active" : ""}
          onClick={() => setActiveTool("management")}
        >
          Management
        </button>
        <button
          className={activeTool === "collection" ? "active" : ""}
          onClick={() => setActiveTool("collection")}
        >
          Collection
        </button>
        <button
          className={activeTool === "services" ? "active" : ""}
          onClick={() => setActiveTool("services")}
        >
          Services
        </button>
        <button
          className={activeTool === "textbooks" ? "active" : ""}
          onClick={() => setActiveTool("textbooks")}
        >
          Text Books
        </button>
        <button
          className={activeTool === "circulation" ? "active" : ""}
          onClick={() => setActiveTool("circulation")}
        >
          Circulation
        </button>
      </div>
      {/* <div className="active-tool">{section}</div> */}
      <div className="active-tool">
        {activeTool === "management" ? (
          <Management showNotification={showNotification} />
        ) : null}
        {activeTool === "collection" ? (
          <Collection showNotification={showNotification} userType={userType} />
        ) : null}
        {activeTool === "services" ? (
          <Services showNotification={showNotification} />
        ) : null}
        {activeTool === "textbooks" ? (
          <TextBooks showNotification={showNotification} />
        ) : null}
        {activeTool === "circulation" ? (
          <Circulation showNotification={showNotification} />
        ) : null}
      </div>
    </div>
  );
}
