import React from "react";

import "../../books/circulation.css";

import mail from "../../../assets/email.png";

export default function Group({ rentedBooks, selectedGrade }) {
  const tableToDisplay = rentedBooks.filter(
    (user) => user.grade === selectedGrade
  );

  function notifyUser(email) {
    const confirmation = window.confirm(
      `Do you want to send a notification to ${email}`
    );
    if (confirmation) {
      console.log(email);
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
        {tableToDisplay.map((user) => (
          <tr key={user.email}>
            <td>{user.lastName + " " + user.secondLastName}</td>
            <td>{user.firstName}</td>
            <td>{user.books[0].title}</td>
            <td>{user.books[0].dateRented}</td>
            <td id="email" onClick={() => notifyUser(user.email)}>
              {/* {user.email}  */}
              <img id="email" src={mail} alt="" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
