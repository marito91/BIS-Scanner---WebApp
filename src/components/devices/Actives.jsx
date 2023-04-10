import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import User from "../devices/User.jsx";

import ipad from "../../assets/ipad.png";
import chromebook from "../../assets/chromebook.png";

export default function Actives({
  setUser,
  rented,
  active,
  setActive,
  entries,
  updateRented,
  showNotification,
}) {
  // The function selectUser displays the information from a selected user in the User component. It receives an object, splits the name to show only the first one, adds it to the last name and assigns the active state with the object information so that the component shows the information.
  function selectUser(user) {
    // const fname = user.firstName.split(" ");
    setActive({
      name: user.name + " " + user.lastName,
      section: user.grade + " - " + user.section,
      device: user.device,
      number: user.number,
      date: user.date,
      time: user.time,
      email: user.email,
      conditions: "Conditions: " + user.conditions,
    });
  }

  // The function returnDevice will be in charge of managing the return of a device by sending the device information to the server which then notifies the user and updates the information for client side. The function receives a string that contains the device information.
  function returnDevice(rentedDevice) {
    console.log(rentedDevice);
    // The string is split
    const [device, number] = [...rentedDevice];
    if (device === "") {
      showNotification("Error", "Please make sure you select a student first.");
    } else {
      if (
        window.confirm(
          `Are you sure the ${device} #${number} is being returned?`
        )
      ) {
        fetch(`${hostbase}/devices/return`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ device, number }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((res) => {
            // Alerts a message that shows what comes from server side including in which conditions the device was rented so that the client can validate if it is being returned in the same conditions.
            showNotification(
              "Alert",
              // res.msg +
              //   ` Reminder: This device was rented with the following observations: ${res.conditions}`
              res.msg
            );
            // The rented list is updated to refresh the page
            updateRented();
            setTimeout(() => {
              window.location.href = "/devices";
            }, 4000); // delay the navigation for 3 seconds (adjust the delay time as needed)
          })
          // If there is an error establishing a connection, an alert is sent.
          .catch(function (e) {
            console.log(e.message);
            showNotification(
              "Error",
              "A connection to the server could not be established when trying to return a device. Please contact ICT Support."
            );
          });
      }
      // The objects' keys are returned to their initial values.
      setUser({
        document: "",
        device: "",
        number: 0,
        name: "",
        section: "",
        date: "",
        time: "",
        email: "",
      });
      setActive({
        document: "",
        device: "",
        number: "",
        name: "",
        section: "",
        date: "",
        time: "",
        email: "",
      });
      // The rented list is updated just in case.
      updateRented();
    }
  }

  // fetchData() is called whenever data is updated.
  // The function arrangeName takes the data coming from server side (first and last names) and capitalizes the first letter of each string so that it can be displayed in the actives list.
  function arrangeName(strFirst, strLast) {
    // Strings first values are taken and lowered cased.
    const first = strFirst.toLowerCase().split(" ")[0];
    const last = strLast.toLowerCase().split(" ")[0];
    // The first letters in each string are capitalized after that.
    const namesUpper = [];
    for (const n of [first, last]) {
      namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    // Finally, both strings are joined and returned by the function to be shown under the devices icons.
    return namesUpper.join(" ");
  }

  // Two states are created to show the number of devices contained for each type (iPads, Chromebooks)
  const [ipads, setIpads] = useState([]);
  const [chromebooks, setChromebooks] = useState([]);

  // The information is fetched from the server so that the count can be updated.
  const availableDevicesCount = async () => {
    const response = await fetch(`${hostbase}/devices/available`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component mounts, it will show the count of available devices for each type. If not, then it sends an alert asking for support.
  useEffect(() => {
    availableDevicesCount()
      .then((res) => {
        setIpads(res.availableIpads);
        setChromebooks(res.availableChromebooks);
      })
      .catch((e) => {
        console.log(e.message);
        // showNotification(
        //   "Alert",
        //   "Connection to the server could not be established when loading available devices. Please contact ICT Support."
        // );
      });
  }, []);

  // This function notifies all users via email. A message is sent from the server side to all users.
  const notifyAll = function () {
    if (rented.length === 0) {
      showNotification("Error", "There are currently no active users.");
    } else {
      const sendMsg = window.confirm("Notify every user by email?");
      if (sendMsg) {
        fetch(`${hostbase}/devices/notification_all`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ rented }),
        })
          .then((res) => res.json())
          .then((res) => {
            // res.status === "Error" ? alert(res.msg) : alert(res.msg); // This is redundant and needs to be changed.
            showNotification("Alert", res.msg);
          })
          // If there is a connection error, an alert is shown to contact support.
          .catch(function (e) {
            console.log(e.message);
            showNotification(
              "Alert",
              "A connection to the server could not be established while trying to send an email to all users.  Please contact ICT Support."
            );
          });
      }
    }
  };

  return (
    <div className="active-users">
      <h1>Active Users</h1>
      <button id="notification-btn" onClick={() => notifyAll()}>
        Send Notification
      </button>
      <div className="active-users-info">
        <div className="stats stats-1">
          <label id="stat">{rented.length}</label>
          <label>Device{rented.length !== 1 ? "s" : ""} rented!</label>
        </div>
        <div className="stats stats-2">
          <label id="stat">{entries.length}</label>
          <label>Rents so far!</label>
        </div>
        <div className="stats stats-3">
          <label id="stat">{ipads.length}</label>
          <label>iPads Available</label>
        </div>
        <div className="stats stats-4">
          <label id="stat">{chromebooks.length}</label>
          <label>ChromeBooks Available</label>
        </div>
        <div className="users">
          {rented.map((entry, index) => (
            <div
              className="user-entry"
              onClick={() => selectUser(entry)}
              key={index}
            >
              <img
                src={
                  entry.device.toLowerCase() === "chromebook"
                    ? chromebook
                    : ipad
                }
                alt=""
              />
              <label>{arrangeName(entry.name, entry.lastName)}</label>
            </div>
          ))}
        </div>
        <User
          active={active}
          returnDevice={returnDevice}
          showNotification={showNotification}
        />
      </div>
    </div>
  );
}
