import React from "react";
import hostbase from "../../hostbase.js";

import search from "../../assets/search.png";

export default function Search({ handleSearch, searchInfo, setSearchInfo }) {
  // The function searchDevice() is in charge of searching devices to check if they are currently rented and by who.
  function searchDevice() {
    // If the type of device is not specified, then an alert will be sent prompting for a valid filter.
    if (searchInfo.device === "" || searchInfo.device === "- Device -") {
      alert("Por favor ingrese un tipo de dispositivo.");
    } else {
      // It doesn't accept the device number if is not in the 0-30 range, since this is the actual number of available devices. If the number changes physically in the library or IT department, then this part needs to be adjusted.
      if (searchInfo.number > 30 || searchInfo.number <= 0) {
        alert("Please enter a valid number between 1 and 30.");
        setSearchInfo({
          document: "",
          date: "",
          filter: "",
          device: "",
          number: "",
        });
      } else {
        fetch(`${hostbase}/devices/search`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ searchInfo }),
        })
          .then((res) => res.json())
          .then((res) => {
            alert(res.msg);
          })
          // If there's an error, it will be alerted.
          .catch(function () {
            alert(
              "A connection to server could not be established while trying to search for a device. Please contact ICT Support."
            );
          });
        // The values on the searchInfo object are set to default.
        setSearchInfo({
          document: "",
          date: "",
          filter: "",
          device: "",
          number: "",
        });
      }
    }
  }

  return (
    <div className="search-module">
      <h2>Search Device</h2>
      <div className="modules-forms">
        <label>Device</label>
        <select
          id="modules-select"
          name="device"
          onChange={handleSearch}
          value={searchInfo.device}
          required
        >
          <option>- Device -</option>
          <option>ChromeBook</option>
          <option>iPad</option>
        </select>
        <label>Number</label>
        <input
          name="number"
          value={searchInfo.number}
          type="number"
          placeholder="1, 16, 28, etc..."
          onChange={handleSearch}
          required
        ></input>
      </div>
      <div className="modules-btns">
        <button onClick={() => searchDevice()}>Search</button>
        <img src={search} alt="" onClick={() => searchDevice()} />
      </div>
    </div>
  );
}
