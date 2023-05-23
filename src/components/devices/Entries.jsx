import React, { useState } from "react";
import hostbase from "../../hostbase.js";

import load from "../../assets/load.png";
import download from "../../assets/download.png";

export default function Entries({ showNotification }) {
  // A state showing what will be the table of entries the user wants to consult is created. It will update with the button/function downloadEntries()
  const [history, setHistory] = useState([]);
  const [searchInfo, setSearchInfo] = useState({
    document: null,
    date: null,
    device: null,
    number: 0,
  });
  // const [document, setDocument] = useState("");
  // const [date, setDate] = useState(null);
  // const [device, setDevice] = useState({ device: "", number: 0 });

  const [desiredFilter, setDesiredFilter] = useState(<></>);

  // The function handleSearch determines the values that are assigned inside the object searchInfo: Device and number. It is used when a device search is done or when entries/history is going to be downloaded.
  const handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSearchInfo((searchInfo) => ({ ...searchInfo, [name]: value }));
  };

  const handleFilter = (event) => {
    setDesiredFilter(event.target.value);
  };

  // This chain of if-else sets the state for the inputs that are going to be displayed for the user based on what they select.
  let fields;
  if (desiredFilter === "document") {
    fields = (
      <>
        <label>Document</label>
        <input
          name="document"
          value={searchInfo.document || ""}
          type="text"
          placeholder="User document"
          onChange={handleSearch}
        ></input>
      </>
    );
  } else if (desiredFilter === "date") {
    fields = (
      <>
        <label>Date</label>
        <label htmlFor="">
          Not available at this time! Please choose another filter.
        </label>
        {/* <input
          name="date"
          value={searchInfo.date}
          maxLength="10"
          type="date"
          placeholder="Date in mm/dd/yyyy format"
          onChange={handleSearch}
        ></input> */}
      </>
    );
  } else if (desiredFilter === "device") {
    fields = (
      <>
        <label>Device</label>
        <select
          id="modules-select"
          name="device"
          onChange={handleSearch}
          value={searchInfo.device || ""}
          required
        >
          <option>- Device -</option>
          <option>ChromeBook</option>
          <option>iPad</option>
        </select>
        <label>Number</label>
        <input
          name="number"
          value={searchInfo.number || ""}
          type="number"
          placeholder="1, 16, 28, etc..."
          onChange={handleSearch}
          required
        ></input>
      </>
    );
  }

  // This function will send the searchInfo data to server so that the desired information can be fetched.
  async function loadData() {
    try {
      const response = await fetch(`${hostbase}/devices/entries`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ searchInfo }),
      });
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status}`);
      }
      const result = await response.json();
      if (result.data.length === 0) {
        showNotification("Error", "No data found.");
        return;
      }
      setHistory(result.data);
      showNotification(
        "Entries loaded",
        `Entries were loaded succesfully. Please proceed to download them.`
      );
      setSearchInfo({
        document: null,
        date: null,
        device: null,
        number: 0,
      });
    } catch (error) {
      showNotification("Error", `Failed to load data: ${error.message}`);
    }
  }

  // When the information is fetched from server side and is loaded and ready to download, a button will be available to call the downloadFile() function, which will ask for confirmation after validation and create a table organizing all of the information that was previously fetched.
  const downloadFile = async function (arr, fileName) {
    if (arr.length === 0) {
      showNotification(
        "Error",
        "No available information to download. Please choose a filter and load the information."
      );
    } else {
      const confirmation = window.confirm(
        "Do you want to download the selected entries?"
      );
      if (confirmation) {
        const header = Object.keys(arr[0]);
        // const newArr = arr.map((entry) => header.map((key) => entry[key]));
        const newArr = await arr.map((entry) =>
          header.map((key) => {
            const value = entry[key];
            return typeof value === "string" ? `"${value}"` : value;
          })
        );

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += header.join(",") + "\r\n";
        newArr.forEach(function (entry) {
          let row = entry.join(",");
          csvContent += row + "\r\n";
        });

        let encodedURI = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedURI);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      }
    }
  };

  return (
    <div className="entries-module">
      <h2>Entries</h2>
      <div className="modules-forms">
        <label>Filter by:</label>
        <select
          id="modules-select"
          name="filter"
          onChange={handleFilter}
          value={desiredFilter}
          required
        >
          <option>- Filter -</option>
          <option value="document">Document</option>
          <option value="date">Date</option>
          <option value="device">Device</option>
        </select>
        {fields}
      </div>
      <div className="modules-btns">
        <button onClick={() => loadData()}>Load Data</button>
        <img src={load} alt="" onClick={() => loadData()} />
        {history.length !== 0 ? (
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <button onClick={() => downloadFile(history, "KC Report")}>
              Download
            </button>
            <img
              src={download}
              alt=""
              onClick={() => downloadFile(history, "KC Report")}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
