import React, { useState } from "react";
import hostbase from "../../hostbase.js";

import folder from "../../assets/folder.png";
import excel from "../../assets/excel.png";

export default function Entries({ handleSearch, searchInfo, setSearchInfo }) {
  // Esta tabla funciona para cargar y descargar los registros que el usuario desee consultar. Se actualiza con el botón/función de downloadEntries()
  const [history, setHistory] = useState([]);

  function downloadEntries() {
    if (searchInfo.filter === "" || searchInfo.filter === "- Filter -") {
      alert("Please choose a filter for your search.");
    } else {
      if (searchInfo.filter === "Documento") {
        if (searchInfo.document === "") {
          alert("Please enter a valid document.");
        } else {
          fetch(`${hostbase}/devices/entries/document`, {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ searchInfo }),
          })
            .then((res) => res.json())
            .then((res) => {
              setHistory(res.data);
              alert(
                `Entries for ${searchInfo.document} were loaded succesfully. Please proceed to download them.`
              );
            })
            // Si hay error de conexión se envía una alerta
            .catch(function () {
              alert(
                "Connection to the server not available. Please contact ICT support."
              );
            });
          // Se restauran a string en blanco los valores del objeto user
          setHistory([]);
          setSearchInfo({
            document: "",
            date: "",
            filter: "",
            device: "",
            number: "",
          });
        }
      } else if (searchInfo.filter === "Fecha") {
        if (searchInfo.date === "") {
          alert("Please enter a valid date.");
        } else {
          fetch(`${hostbase}/devices/entries/date`, {
            headers: { "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ searchInfo }),
          })
            .then((res) => res.json())
            .then((res) => {
              setHistory(res.data);
              alert(
                `Entries for ${searchInfo.date} were loaded succesfully. Please proceed to download them.`
              );
            })
            // Si hay error de conexión se envía una alerta
            .catch(function () {
              alert(
                "Connection to the server not available. Please contact ICT support."
              );
            });
          // Se restauran a string en blanco los valores del objeto user
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
    }
  }

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
          name="filter"
          onChange={handleSearch}
          value={searchInfo.filter}
          required
        >
          <option>- Filter -</option>
          <option>Documento</option>
          <option>Fecha</option>
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
          placeholder="Fecha en formato mm/dd/yyyy"
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
