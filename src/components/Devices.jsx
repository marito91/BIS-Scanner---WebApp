import React, { useState, useEffect } from "react";
import hostbase from "../hostbase.js";

import Actives from "./devices/Actives.jsx";
import Rent from "./devices/Rent.jsx";
// import Search from "./devices/Search.jsx";
import Entries from "./devices/Entries.jsx";
import "../components/devices/devices.css";

export default function Devices({ setUser, showNotification }) {
  /** Objects used under the devices section
   * active : similar to searchInfo but this object, that also works through state management, shows the information regarding an active device. This will prevent the information to change in different modules.
   */

  // Object to show on client side
  const [active, setActive] = useState({
    document: "",
    device: "",
    number: "",
    name: "",
    section: "",
    date: "",
    time: "",
    email: "",
    conditions: "",
  });

  // This array will contain all of the information of the devices currently rented. It will update with the function updatedRented()
  const [rented, setRented] = useState([]);

  // This table will be used to count the number of all time rented devices in the application.
  const [entries, setEntries] = useState(0);

  // The async function entryCount() will bring the information of rented devices from the server side.
  const entryCount = async () => {
    const response = await fetch(`${hostbase}/devices/rented_all_time`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component loads, the information fetched from the server side will update and the number of entries will be shown in the section.
  useEffect(() => {
    entryCount()
      .then((res) => {
        // res.data === undefined ? setEntries([]) : setEntries(res.data);
        setEntries(res.data);
      })
      .catch((e) => {
        console.log(e.message);
        alert(
          "Number of device entries could not be fetched. Please contact ICT Support."
        );
      });
  }, []);

  // The function updateRented() updates the list of devices currently rented so that the client knows which devices are currently in circulation by fetching the information from server side.
  const updateRented = async () => {
    const response = await fetch(`${hostbase}/devices/rented`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component loads, the updated list of rented devices is going to be shown. This will let different components to display information regarding their use.
  useEffect(() => {
    updateRented()
      .then((res) => {
        // console.log(res.listOfRentedDevices);
        res.listOfRentedDevices === undefined
          ? setRented([])
          : setRented(res.listOfRentedDevices);
      })
      .catch((e) => {
        console.log(e.message);
        console.log(
          "The list of rented devices could not be fetched. Please contact ICT Support."
        );
      });
  }, []);

  return (
    <div className="devices-section">
      <Actives
        setUser={setUser}
        rented={rented}
        active={active}
        setActive={setActive}
        entries={entries}
        updateRented={updateRented}
        showNotification={showNotification}
      />
      <div className="modules">
        <Rent
          updateRented={updateRented}
          entryCount={entryCount}
          showNotification={showNotification}
        />
        <Entries showNotification={showNotification} />
      </div>
    </div>
  );
}
