import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import Group from "./circulation/Group.jsx";
import "../books/circulation.css";

export default function Circulation() {
  const sections = [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "PREESCOLAR",
    "PRIMARIA",
    "SECUNDARIA",
    "ADMINISTRATIVA",
  ];
  const teacherSections = [
    0,
    "PREESCOLAR",
    "PRIMARIA",
    "SECUNDARIA",
    "ADMINISTRATIVA",
  ];
  const [rentedBooks, setRentedBooks] = useState([]);
  const [section, setSection] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState("");

  function handleSection(selected) {
    if (teacherSections.includes(selected)) {
      setSelectedGrade(selected);
      setSection(0);
    } else {
      setSection(selected);
    }
  }

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
    <>
      <div className="circulation-sections">
        <div>
          {sections.map((number) => (
            <>
              <button key={number} onClick={() => handleSection(number)}>
                {number}
              </button>
            </>
          ))}
        </div>
        {teacherSections.includes(section) ? (
          <></>
        ) : (
          <div className="classes">
            <button onClick={() => setSelectedGrade(section + "A")}>
              {section + "A"}
            </button>
            <button onClick={() => setSelectedGrade(section + "B")}>
              {section + "B"}
            </button>
            <button onClick={() => setSelectedGrade(section + "C")}>
              {section + "C"}
            </button>
          </div>
        )}
        {/* {sections.map((lineOfGrades) => (
          <div key={lineOfGrades} className="section-line">
            {lineOfGrades.map((grade) => (
              <button key={grade} onClick={() => setSelectedGrade(grade)}>
                {grade}
              </button>
            ))}
          </div>
        ))} */}
      </div>

      <Group rentedBooks={rentedBooks} selectedGrade={selectedGrade} />
    </>
  );
}
