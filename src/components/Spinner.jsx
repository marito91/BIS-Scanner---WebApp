import React from "react";

// This component has the only purpose of being displayed while information is being fetched from the server.
export default function Spinner({ message }) {
  return (
    <div className="loading">
      <h2>{message}</h2>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
