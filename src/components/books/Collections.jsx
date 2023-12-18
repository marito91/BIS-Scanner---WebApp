import React, { useState } from "react";

import Collection from "../books/Collection";
import Circulation from "../books/Circulation.jsx";

export default function Collections({ userType, showNotification }) {
  // A state is declared which will hold the active component for the books section. It is set to the collection by default.
  const [activeTool, setActiveTool] = useState("collection");
  return (
    <>
      <div className="collections-container">
        <div className="collections">
          <div
            className={activeTool === "collection" ? "chosen-list" : ""}
            onClick={() => setActiveTool("collection")}
          >
            <h3>Collection</h3>
          </div>
          <div
            className={activeTool === "circulation" ? "chosen-list" : ""}
            onClick={() => setActiveTool("circulation")}
          >
            <h3>Circulation</h3>
          </div>
        </div>
        {activeTool === "circulation" ? (
          <Circulation
            showNotification={showNotification}
            userType={userType}
          />
        ) : (
          <Collection showNotification={showNotification} userType={userType} />
        )}
      </div>
    </>
  );
}
