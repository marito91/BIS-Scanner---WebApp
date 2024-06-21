import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import ipad from "../../assets/ipad.png";
import chromebook from "../../assets/chromebook.png";
import Calculator from "../../assets/calculator.png";
import inactive from "../../assets/inactive.svg";

export default function Actives({
  rented,
  entries,
  setActive,
  setIsUserVisible,
  setCalcModalIsVisible,
  closeRentModal,
  rentedCalcs,
  socket,
}) {
  // The function selectUser displays the information from a selected user in the User component. It receives an object, splits the name to show only the first one, adds it to the last name and assigns the active state with the object information so that the component shows the information.
  function selectUser(user, calc) {
    // const fname = user.firstName.split(" ");
    // console.log(calc);
    const activeUser = {
      name: user.name + " " + user.lastName,
      section: user.grade + " - " + user.section,
      device: user.device,
      number: user.number,
      date: user.date,
      time: user.time,
      email: user.email,
      conditions: "Conditions: " + user.conditions,
    };

    if (calc) {
      activeUser.calculator = calc.number;
      activeUser.calcDate = calc.date;
      activeUser.calcConditions = calc.conditions;
    }

    setActive(activeUser);
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
  const [calculators, setCalculators] = useState([]);

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
    if (socket) {
      availableDevicesCount()
        .then((res) => {
          res.availableIpads === undefined
            ? setIpads([])
            : setIpads(res.availableIpads);
          res.availableChromebooks === undefined
            ? setChromebooks([])
            : setChromebooks(res.availableChromebooks);
          res.availableCalculators === undefined
            ? setCalculators([])
            : setCalculators(res.availableCalculators);
        })
        .catch((e) => {
          console.log(e.message);
        });
      socket.on("devicesCount", (data) => {
        // console.log(data.iPads);
        setIpads(data.iPads);
        setChromebooks(data.chromeBooks);
        setCalculators(data.calculators);
      });
    }

    return () => {
      if (socket) {
        socket.off("devicesCount");
      }
    };
  }, [socket]);

  // This function notifies all users via email. A message is sent from the server side to all users.
  // const notifyAll = function () {
  //   if (rented.length === 0) {
  //     showNotification("Error", "There are currently no active users.");
  //   } else {
  //     const sendMsg = window.confirm("Notify every user by email?");
  //     if (sendMsg) {
  //       fetch(`${hostbase}/devices/notification_all`, {
  //         headers: { "content-type": "application/json" },
  //         method: "POST",
  //         body: JSON.stringify({ rented }),
  //       })
  //         .then((res) => res.json())
  //         .then((res) => {
  //           showNotification("Alert", res.msg);
  //         })
  //         // If there is a connection error, an alert is shown to contact support.
  //         .catch(function (e) {
  //           console.log(e.message);
  //           showNotification(
  //             "Alert",
  //             "A connection to the server could not be established while trying to send an email to all users.  Please contact ICT Support."
  //           );
  //         });
  //     }
  //   }
  // };

  return (
    <>
      <div className="stats-container">
        <div className="stats-1" id="active-devices">
          <label id="stat">{rented.length}</label>
          <label id="data">Active User{rented.length !== 1 ? "s" : ""}!</label>
        </div>
        <div className="stats-2" id="active-chromes">
          <label id="stat">{chromebooks.length}</label>
          <label id="data">ChromeBooks Available</label>
        </div>
        <div className="stats-3" id="active-ipads">
          <label id="stat">{ipads.length}</label>
          <label id="data">iPads Available</label>
        </div>
        <div
          className="stats-4"
          id="active-calcs"
          onClick={() => {
            setCalcModalIsVisible(true);
            closeRentModal();
          }}
        >
          <label id="stat">{calculators.length}</label>
          <label id="data">Calculators Available</label>
        </div>
        <div className="stats-5" id="active-entries">
          <label id="stat">{entries}</label>
          <label id="data">Entries so far!</label>
        </div>
      </div>
      {rented.length > 0 ? (
        <>
          <div className="actives-container">
            {rented.map((entry, index) => {
              // Check if entry.document is in rentedCalcs array
              const calc = rentedCalcs.find(
                (calc) => calc.document === entry.document
              );

              return (
                <div
                  className="actives-entry"
                  onClick={() => {
                    selectUser(entry, calc);
                    setIsUserVisible(true);
                    closeRentModal();
                  }}
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
                  <div className="actives-entry-info">
                    <label id="name">
                      {arrangeName(entry.name, entry.lastName)}
                    </label>
                    <label id="grade">{entry.grade}</label>
                    <label id="dev">{entry.device + " #" + entry.number}</label>
                  </div>
                  {calc && <img src={Calculator} id="calculator" alt="" />}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div
          className="no-active"
          style={{ textAlign: "center", color: "#1a2141" }}
        >
          <img src={inactive} alt="" />
          <h1>There are no active devices in circulation right now.</h1>
        </div>
      )}
    </>
  );
}
