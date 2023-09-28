import React, { useState } from "react";
import hostbase from "../../../hostbase.js";

import "../../books/circulation.css";

// This component receives 2 props: rentedBooks which contains all the active rentedBooks, and selecteGrade which is the string that decides what section/grade/class is going to be displayed.
export default function Group({
  rentedBooks,
  selectedGrade,
  showNotification,
}) {
  // A new array is created by filtering the rentedBooks array with the grade that was selected by the user. This new array, is the table that's going to be displayed.
  const tableToDisplay = rentedBooks.filter(
    (user) => user.grade === selectedGrade
  );

  // The notifyUser funtcion will receive the user object as params and after confirmation it will grab the email and send the notification to the selected user via the server.
  function notifyUser(user) {
    const confirmation = window.confirm(
      `Do you want to send a notification to ${user.email}`
    );
    if (confirmation) {
      fetch(`${hostbase}/books/notification`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ user }),
      })
        .then((res) => res.json())
        .then((res) => {
          alert(res.msg);
        })
        // If there's a connection error, an alert is sent.
        .catch(function () {
          showNotification(
            "Error",
            "There was a problem while trying to notify the user. Please contact ICT support."
          );
        });
    }
  }

  const [hoveredBookTitle, setHoveredBookTitle] = useState(null);

  const [modalCoordinates, setModalCoordinates] = useState({ x: 0, y: 0 });

  const handleMouseOver = (barcode, event) => {
    const user = tableToDisplay.find((user) => user.barcode === barcode);
    if (user) {
      setModalCoordinates({ x: event.clientX, y: event.clientY });
      setHoveredBookTitle(user.barcode); // Update the hovered book title
    }
  };

  const handleMouseOut = () => {
    setModalCoordinates({ x: 0, y: 0 }); // Clear the modal coordinates
    setHoveredBookTitle(null);
  };

  const modalStyles = {
    display: hoveredBookTitle ? "block" : "none",
    position: "fixed",
    top: `${modalCoordinates.y - 20}px`,
    left: `${modalCoordinates.x + 20}px`,
    background: "white",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <table className="">
        <thead>
          <tr>
            <th style={{ borderRadius: "10px 0 0 0" }}>Name</th>
            <th>Rented Book</th>
            <th>Due Date</th>
            <th style={{ borderRadius: "0 10px 0 0" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {/* The table array with the selected grade is mapped so that the user can see all active rented books from the selected section. */}
          {tableToDisplay.map((user) => (
            <tr key={user.email}>
              <td>
                <span>Name</span>
                {user.name + " " + user.lastName}
              </td>
              <td
                onClick={() => console.log(user)}
                onMouseOver={(event) => handleMouseOver(user.barcode, event)}
                onMouseOut={handleMouseOut}
              >
                <span>Rented Book</span>
                {user.title}
              </td>
              <td>
                <span>Due Date</span>
                {user.bookHistory[user.bookHistory.length - 1].dueDate}
              </td>
              <td id="email" onClick={() => notifyUser(user)}>
                <span>Email</span>
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button onClick={() => console.log(rentedBooks)}>Check rented</button> */}
      {hoveredBookTitle && (
        <div style={modalStyles}>
          <p>{hoveredBookTitle}</p>
        </div>
      )}
    </>
  );
}
