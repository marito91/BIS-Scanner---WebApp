import React from "react";

import back from "../../assets/back.png";
import email from "../../assets/email.png";
import contact from "../../assets/contact-icon.svg";
import building from "../../assets/building-icon.svg";
import devices from "../../assets/devices-icon.svg";
import calendar from "../../assets/calendar-icon.svg";

export default function User({ notify, returnDevice, active }) {
  const device = active.device + " #" + active.number;
  const date = "Rented on " + active.date + " at " + active.time;
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
      {/* This is removed because date and time were removed from the user data in backend */}
      <div className="entry">
        <img src={calendar} alt="" />
        <label>{active.name === "" ? "" : date}</label>
      </div>
      <div className="btn">
        <button onClick={() => returnDevice([active.device, active.number])}>
          Return
        </button>
        <button onClick={() => notify(active)}>Remind</button>
      </div>
      <div className="btn-icons">
        <img
          src={back}
          alt=""
          onClick={() => returnDevice([active.device, active.number])}
        />
        <img src={email} alt="" onClick={() => notify(active)} />
      </div>
    </div>
  );
}
