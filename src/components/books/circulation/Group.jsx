import React from "react";
import hostbase from "../../../hostbase.js";

import "../../books/circulation.css";

import mail from "../../../assets/email.png";

// This component receives 2 props: rentedBooks which contains all the active rentedBooks, and selecteGrade which is the string that decides what section/grade/class is going to be displayed.
export default function Group({ rentedBooks, selectedGrade }) {
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
          res.status === "Error" ? alert(res.msg) : alert(res.msg); // This needs to be fixed, it doesn't make sense.
        })
        // If there's a connection error, an alert is sent.
        .catch(function () {
          alert(
            "A connection to the server could not be established while trying to notify the user. Please contact ICT Suppport."
          );
        });
    }
  }

  return (
    <table className="classroom">
      <thead>
        <tr>
          <th style={{ borderRadius: "10px 0 0 0" }}>Last Name</th>
          <th>First Name</th>
          <th>Rented Book</th>
          <th>Date Rented</th>
          <th style={{ borderRadius: "0 10px 0 0" }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {/* The table array with the selected grade is mapped so that the user can see all active rented books from the selected section. */}
        {tableToDisplay.map((user) => (
          <tr key={user.email}>
            <td>{user.lastName + " " + user.secondLastName}</td>
            <td>{user.firstName}</td>
            <td>{user.books[0].title}</td>
            <td>{user.books[0].dateRented}</td>
            <td id="email" onClick={() => notifyUser(user)}>
              {/* {user.email}  */}
              <img id="email" src={mail} alt="" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
