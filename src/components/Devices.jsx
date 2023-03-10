import React, { useState, useEffect } from "react";
import hostbase from "../hostbase.js";

import Actives from "./devices/Actives.jsx";
import Rent from "./devices/Rent.jsx";
import Search from "./devices/Search.jsx";
import Entries from "./devices/Entries.jsx";
import "../components/devices/devices.css";

export default function Devices({ user, setUser }) {
  /** Objects used under the devices section
   * searchInfo : Mananged through states, this object is necessary to search and show information from the server side related to history of rented devices and active devices.
   * active : similar to searchInfo but this object, that also works through state management, shows the information regarding an active device. This will prevent the information to change in different modules.
   */
  const [searchInfo, setSearchInfo] = useState({
    document: "",
    date: "",
    filter: "",
    device: "",
    number: "",
  });

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
  });

  // The function handleSearch determines the values that are assigned inside the object searchInfo: Device and number. It is used when a device search is done or when entries/history is going to be downloaded.
  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchInfo((searchInfo) => ({ ...searchInfo, [name]: value }));
  };

  // This array will contain all of the information of the devices currently rented. It will update with the function updatedRented()
  const [rented, setRented] = useState([]);

  // This table will be used to count the number of all time rented devices in the application.
  const [entries, setEntries] = useState([]);

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
        setRented(res.data);
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
      />
      <div className="modules">
        <Rent
          setActive={setActive}
          updateRented={updateRented}
          entryCount={entryCount}
        />
        <Search
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          handleSearch={handleSearch}
        />
        <Entries
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
}
