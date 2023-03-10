import React from "react";
import hostbase from "../../hostbase.js";

import back from "../../assets/back.png";
import email from "../../assets/email.png";
import contact from "../../assets/contact-icon.svg";
import building from "../../assets/building-icon.svg";
import devices from "../../assets/devices-icon.svg";
import calendar from "../../assets/calendar-icon.svg";

export default function User({ returnDevice, active }) {
  const device = active.device + " #" + active.number;
  const date = "Rented on " + active.date + " at " + active.time;

  // This function notifies a selected student via email. First it checks if the user object contains the actual information needed to connect to server side. After confirming everything is okay and the client also confirms, a message is sent from the server side to the selected user.
  function notifyOne(user) {
    if (user.email === "") {
      alert("Please select a user first!");
    } else {
      const sendMsg = window.confirm(
        `Do you want to send an email notification to ${user.name}?`
      );
      if (sendMsg) {
        fetch(`${hostbase}/devices/notification`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ user }),
        })
          .then((res) => res.json())
          .then((res) => {
            res.status === "Error" ? alert(res.msg) : alert(res.msg); // This is redundant and needs to be changed.
          })
          // If there is a connection error, an alert is shown to contact support.
          .catch(function () {
            alert(
              "A connection to the server could not be established while trying to send an email. Please contact ICT Support."
            );
          });
      }
    }
  }
  return (
    <div className="user-info">
      <h2>User Information</h2>
      <div className="entry">
        <img src={contact} alt="" />
        <label>{active.name}</label>
      </div>
      <div className="entry">
        <img src={building} alt="" />
        <label>{active.section}</label>
      </div>
      <div className="entry">
        <img src={devices} alt="" />
        <label>{active.name === "" ? "" : device}</label>
      </div>
      <div className="entry">
        <img src={calendar} alt="" />
        <label>{active.name === "" ? "" : date}</label>
      </div>
      <div className="btn">
        <button onClick={() => returnDevice([active.device, active.number])}>
          Return
        </button>
        <button onClick={() => notifyOne(active)}>Remind</button>
      </div>
      <div className="btn-icons">
        <img
          src={back}
          alt=""
          onClick={() => returnDevice([active.device, active.number])}
        />
        <img src={email} alt="" onClick={() => notifyOne(active)} />
      </div>
    </div>
  );
}
