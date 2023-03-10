import React, { useState } from "react";
import hostbase from "../../hostbase.js";

import folder from "../../assets/folder.png";
import excel from "../../assets/excel.png";

export default function Entries({ handleSearch, searchInfo, setSearchInfo }) {
  // A state showing what will be the table of entries the user wants to consult is created. It will update with the button/function downloadEntries()
  const [history, setHistory] = useState([]);

  // Functions that download entries are separated by filter so that it can be easier to modify each one of them separately. The main downloadEntries() will decide which one of these functions will be called when the button is pressed.
  function downloadDocumentEntries() {
    if (searchInfo.document === "") {
      alert("Please enter a valid document.");
    } else {
      // If document was selected and all validations are ok, the information will be brought from the server.
      fetch(`${hostbase}/devices/entries/document`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ searchInfo }),
      })
        .then((res) => res.json())
        .then((res) => {
          // The table is updated with the data brought from the server. User will no be able to download it.
          setHistory(res.data);
          alert(
            `Entries for ${searchInfo.document} were loaded succesfully. Please proceed to download them.`
          );
        })
        // If there is an error establishing connection, then an alert asking for help will be sent.
        .catch(function () {
          alert(
            "Connection to the server could not be established when trying to search by document. Please contact ICT support."
          );
        });
      // The states are updated to their initial values.
      setHistory([]);
      setSearchInfo({
        document: "",
        date: "",
        filter: "",
        device: "",
        number: "",
      });
    }
  }

  function downloadDateEntries() {
    if (searchInfo.date === "") {
      alert("Please enter a valid date.");
    } else {
      // If date was selected and all validations are ok, the information will be brought from the server.
      fetch(`${hostbase}/devices/entries/date`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ searchInfo }),
      })
        .then((res) => res.json())
        .then((res) => {
          // The table is updated with the data brought from the server. User will no be able to download it.
          setHistory(res.data);
          alert(
            `Entries for ${searchInfo.date} were loaded succesfully. Please proceed to download them.`
          );
        })
        // If there is an error establishing connection, then an alert asking for help will be sent.
        .catch(function () {
          alert(
            "Connection to the server could not be established when trying to search by date. Please contact ICT support."
          );
        });
      // The states are updated to their initial values.
      setHistory([]);
      setSearchInfo({
        document: "",
        date: "",
        filter: "",
        device: "",
        number: "",
      });
    }
  }

  function downloadRentedEntries() {
    // If rented was selected and all validations are ok, the information will be brought from the server.
    // This type of consultation doesn't need a search params so in this case the method will be a GET.
    fetch(`${hostbase}/devices/rented`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // The table is updated with the data brought from the server. User will no be able to download it.
        setHistory(res.data);
        alert(
          `Entries for rented devices were loaded succesfully. Please proceed to download them.`
        );
      })
      // If there is an error establishing connection, then an alert asking for help will be sent.
      .catch(function () {
        alert(
          "Connection to the server could not be established when trying to search by rented. Please contact ICT support."
        );
      });
    // The states are updated to their initial values.
    setHistory([]);
    setSearchInfo({
      document: "",
      date: "",
      filter: "",
      device: "",
      number: "",
    });
  }

  // The function downloadEntries brings the information from the server by sending a filter chosen by the user, and the corresponding information to that filter (document or date).
  function downloadEntries() {
    // First, it validates that a filter was selected for the search of information.
    if (searchInfo.filter === "" || searchInfo.filter === "- Filter -") {
      alert("Please choose a filter for your search.");
    } else {
      // Then it validates after choosing the filter, that the corresponding information is also being input by the user.
      if (searchInfo.filter === "Document") {
        downloadDocumentEntries();
      } else if (searchInfo.filter === "Date") {
        downloadDateEntries();
      } else if (searchInfo.filter === "Rented") {
        downloadRentedEntries();
      }
    }
  }

  // When the information is fetched from server side and is loaded and ready to download, a button will be available to call the downloadFile() function, which will ask for confirmation after validation and create a table organizing all of the information that was previously fetched.
  const downloadFile = function (arr) {
    if (arr.length === 0) {
      alert(
        "No available information to download. Please choose a filter and load the information."
      );
    } else {
      const confirmation = window.confirm(
        "Do you want to download the selected entries?"
      );
      if (confirmation) {
        const newArr = arr.map((entry) => [
          entry.grade,
          entry.firstName,
          entry.lastName,
          entry.code,
          entry.date,
          entry.time,
          entry.device,
          entry.number,
          entry.type,
        ]);

        let csvContent = "data:text/csv;charset=utf-8,";
        newArr.forEach(function (entry) {
          let row = entry.join(",");
          csvContent += row + "\r\n";
        });

        let encodedURI = encodeURI(csvContent);
        window.open(encodedURI);
      }
    }
  };

  return (
    <div className="entries-module">
      <h2>Entries</h2>
      <div className="modules-forms">
        <label>Filter</label>
        <select
          id="modules-select"
          name="filter"
          onChange={handleSearch}
          value={searchInfo.filter}
          required
        >
          <option>- Filter -</option>
          <option>Document</option>
          <option>Date</option>
          <option>Rented</option>
        </select>
        <label>Document</label>
        <input
          name="document"
          value={searchInfo.document}
          type="text"
          placeholder="User document"
          onChange={handleSearch}
        ></input>
        <label>Date</label>
        <input
          name="date"
          value={searchInfo.date}
          maxLength="10"
          type="date"
          placeholder="Date in mm/dd/yyyy format"
          onChange={handleSearch}
        ></input>
      </div>
      <div className="modules-btns">
        <button onClick={() => downloadEntries()}>Load Data</button>
        <img src={folder} alt="" onClick={() => downloadEntries()} />
        {history.length !== 0 ? (
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <button onClick={() => downloadFile(history)}>Download</button>
            <img src={excel} alt="" onClick={() => downloadFile(history)} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
