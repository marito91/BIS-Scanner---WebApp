import React, { useState } from "react";
import hostbase from "../../hostbase.js";

import contact from "../../assets/contact-icon.svg";
import building from "../../assets/building-icon.svg";
import devices from "../../assets/devices-icon.svg";
import calendar from "../../assets/calendar-icon.svg";
import condition from "../../assets/condition-icon.svg";
import email from "../../assets/email.svg";
import calculator from "../../assets/calculator-icon.svg";

export default function User({
  returnDevice,
  active,
  closeUser,
  showNotification,
  returnCalc,
}) {
  const device = active.device + " #" + active.number;
  // const date = "Rented on " + active.date + " at " + active.time;
  const date = "Rented on " + active.date;

  // This function notifies a selected student via email. First it checks if the user object contains the actual information needed to connect to server side. After confirming everything is okay and the client also confirms, a message is sent from the server side to the selected user.
  function notifyOne(user) {
    if (user.email === "") {
      showNotification("Error", "Please select a user first!");
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
            res.status === "Error"
              ? showNotification(
                  "Error",
                  "There was a problem trying to send the email. Please try again and if the problem persists, call ICT Support."
                )
              : showNotification("Success", res.msg);
          })
          // If there is a connection error, an alert is shown to contact support.
          .catch(function (e) {
            console.log(e.message);
            showNotification(
              "Error",
              "A connection to the server could not be established while trying to send an email. Please contact ICT Support."
            );
          });
      }
    }
  }

  const [hoveredCalc, setHoveredCalc] = useState(null);

  const [modalCoordinates, setModalCoordinates] = useState({ x: 0, y: 0 });

  const handleMouseOver = (active, event) => {
    setModalCoordinates({ x: event.clientX, y: event.clientY });
    setHoveredCalc(active.calcDate); // Update the hovered book title
  };

  const handleMouseOut = () => {
    setModalCoordinates({ x: 0, y: 0 }); // Clear the modal coordinates
    setHoveredCalc(null);
  };

  const modalStyles = {
    display: hoveredCalc ? "block" : "none",
    position: "fixed",
    top: `${modalCoordinates.y - 20}px`,
    left: `${modalCoordinates.x + 20}px`,
    background: "white",
    border: "1px solid #ccc",
    padding: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: "1",
  };

  return (
    <>
      <div className="user-info">
        <h2>User Information</h2>
        <div className="user-info-columns">
          <div className="user-info-col-1">
            <h3>Name</h3>
            <div className="entry">
              <img src={contact} alt="" />
              <label>{active.name}</label>
            </div>
            <h3>Section</h3>
            <div className="entry">
              <img src={building} alt="" />
              <label>{active.section}</label>
            </div>
          </div>
          <div className="user-info-col-2">
            <h3>Devices Rented</h3>
            <div className="entry">
              <img src={devices} alt="" />
              <label>{active.name === "" ? "" : device}</label>
              {active.calculator ? (
                <>
                  <img src={calculator} alt="" />
                  <label
                    id="calculator"
                    onMouseOver={(event) => handleMouseOver(active, event)}
                    onMouseOut={handleMouseOut}
                    onClick={() => {
                      returnCalc(active.calculator);
                      handleMouseOut();
                    }}
                  >
                    {"Calculator # " + active.calculator}
                  </label>
                </>
              ) : (
                <></>
              )}
            </div>
            <h3>Date Rented</h3>
            <div className="entry">
              <img src={calendar} alt="" />
              <label>{active.name === "" ? "" : date}</label>
            </div>
          </div>
        </div>
        <h3>Email</h3>
        <div className="entry">
          <img src={email} alt="" />
          <label
            id="mail"
            style={{ color: "blue", textDecoration: "underline" }}
            onClick={() => notifyOne(active)}
          >
            {active.email}
          </label>
        </div>
        <h3>Conditions</h3>
        <div className="entry">
          <img src={condition} alt="" />
          <label>{active.conditions === "" ? "" : active.conditions}</label>
        </div>
        <div className="user-info-btns">
          {/* <button onClick={() => notifyOne(active)}>Remind</button> */}
          <button id="cancel-btn" onClick={closeUser}>
            Close
          </button>
          <button
            id="return-btn"
            onClick={() => returnDevice([active.device, active.number])}
          >
            Return
          </button>
        </div>
      </div>

      {hoveredCalc && (
        <div style={modalStyles}>
          <p>{hoveredCalc}</p>
        </div>
      )}
    </>
  );
}
