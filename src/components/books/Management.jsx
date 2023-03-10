import React, { useState /*, useEffect*/ } from "react";
// import hostbase from "../../hostbase.js";

import NewBook from "../books/management/NewBook.jsx";
import ManageBook from "../books/management/ManageBook.jsx";
import Collection from "../books/management/Collection.jsx";

import "../books/management.css";

export default function Management() {
  // Initial state to manage what tool will be displayed in this section. It will show an initial message so that it encourages the user to select one of the available tools: Insert, Edit, Collection.
  const [tool, setTool] = useState(
    <>
      <h1>Please select a tool to work with!</h1>
    </>
  );

  return (
    <div className="book-management">
      <div className="book-tools-buttons">
        {/* The NewBook tool lets the user add new books to the library collection. */}
        <button onClick={() => setTool(<NewBook />)}>Insert</button>
        {/* The ManageBook tool lets the user edit or delete books from the library collection. */}
        <button onClick={() => setTool(<ManageBook />)}>Edit</button>
        {/* The collection tool will display the whole library collection so that the user can index any book. */}
        <button onClick={() => setTool(<Collection />)}>Collection</button>
      </div>
      <div className="selected-book-tool">{tool}</div>
    </div>
  );
}
