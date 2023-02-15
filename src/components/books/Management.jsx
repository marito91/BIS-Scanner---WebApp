import React, { useState /*, useEffect*/ } from "react";
// import hostbase from "../../hostbase.js";

import NewBook from "../books/management/NewBook.jsx";
// import DeleteBook from "../books/management/DeleteBook.jsx";
import ManageBook from "../books/management/ManageBook.jsx";
import Collection from "../books/management/Collection.jsx";

import "../books/management.css";

export default function Management() {
  const [tool, setTool] = useState(
    <>
      <h1>Please select a tool to work with!</h1>
    </>
  );

  return (
    <div className="book-management">
      <div className="book-tools-buttons">
        <button onClick={() => setTool(<NewBook />)}>Insert</button>
        <button onClick={() => setTool(<ManageBook />)}>Edit</button>
        <button onClick={() => setTool(<Collection />)}>Collection</button>
      </div>
      <div className="selected-book-tool">{tool}</div>
    </div>
  );
}
