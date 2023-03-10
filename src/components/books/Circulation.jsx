import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import Group from "./circulation/Group.jsx";
import "../books/circulation.css";

export default function Circulation() {
  // First, all of the sections available in the school are declared inside an array called sections.
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

  // Then the staff sections are declared inside another array to make a comparison later on.
  const staffSections = [
    0,
    "PREESCOLAR",
    "PRIMARIA",
    "SECUNDARIA",
    "ADMINISTRATIVA",
  ];

  // After that, several states are declared for the following:
  /**
   * rentedBooks = Which will contain the books rented to the selected section/grade
   * section = Which will manage the section that will be displayed
   * selectedGrade = Which will manage the selected grade for the students sections.
   */
  const [rentedBooks, setRentedBooks] = useState([]);
  const [section, setSection] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState("");

  // The following function handles which section will be displayed.
  function handleSection(selected) {
    // It checks if the staffSections includes the params that's passed through the function. If it does then the selectedGrade to be displayed will only be the section, since they don't contain grades.
    if (staffSections.includes(selected)) {
      setSelectedGrade(selected);
      setSection(0);
      // If by the other hand, the params is not included in the staffSections, it means it is a student grade and a class needs to be selected.
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
        {/* The sections array is mapped in buttons, so that the user can choose which section it wants to see. */}
        <div>
          {sections.map((number) => (
            <button key={number} onClick={() => handleSection(number)}>
              {number}
            </button>
          ))}
        </div>
        {/* If the selected section is not a staff section, then 3 new buttons will appear to select a class (A,B,C)*/}
        {staffSections.includes(section) ? (
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
      </div>
      {/* The Group component holds the table which displays the active users from the selected section. */}
      <Group rentedBooks={rentedBooks} selectedGrade={selectedGrade} />
    </>
  );
}
