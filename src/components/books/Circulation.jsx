import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import Group from "./circulation/Group.jsx";
import "../books/circulation.css";

export default function Circulation() {
  const sections = [
    ["3A", "3B", "3C", "4A", "4B", "4C", "5A", "5B", "5C", "6A", "6B", "6C"],
    ["7A", "7B", "7C", "8A", "8B", "8C", "9A", "9B", "9C", "10A", "10B", "10C"],
    ["11A", "11B", "11C", "12A", "12B", "12C", "13A", "13B", "13C"],
    ["PREESCOLAR", "PRIMARIA", "SECUNDARIA", "ADMINISTRATIVA"],
  ];
  const [rentedBooks, setRentedBooks] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");

  const checkRented = async () => {
    const response = await fetch(`${hostbase}/books/rented`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  useEffect(() => {
    checkRented()
      .then((res) => {
        setRentedBooks(res.data);
      })
      .catch((e) => {
        console.log(e.message);
        alert(
          "En este momento no hay conexión al servidor. Por favor solicitar soporte a SISTEMAS."
        );
      });
  }, []);
  return (
    <div>
      <div className="circulation-sections">
        {sections.map((lineOfGrades) => (
          <div className="section-line">
            {lineOfGrades.map((grade) => (
              <button onClick={() => setSelectedGrade(grade)}>{grade}</button>
            ))}
          </div>
        ))}
      </div>

      <Group rentedBooks={rentedBooks} selectedGrade={selectedGrade} />
    </div>
  );
}
