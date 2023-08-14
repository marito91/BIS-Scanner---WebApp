import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import Group from "./circulation/Group.jsx";
import "../books/circulation.css";

export default function Circulation({ showNotification }) {
  // First, all of the sections available in the school are declared inside an array called sections.
  const sections = [
    { value: "", text: "--Choose a grade or section--" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    { value: "5", text: "5" },
    { value: "6", text: "6" },
    { value: "7", text: "7" },
    { value: "8", text: "8" },
    { value: "9", text: "9" },
    { value: "10", text: "10" },
    { value: "11", text: "11" },
    { value: "12", text: "12" },
    { value: "13", text: "13" },
    { value: "PREESCOLAR", text: "PREESCOLAR" },
    { value: "PRIMARIA", text: "PRIMARIA" },
    { value: "SECUNDARIA", text: "SECUNDARIA" },
    { value: "ADMINISTRATIVA", text: "ADMINISTRATIVA" },
  ];

  // Then the staff sections are declared inside another array to make a comparison later on.
  const staffSections = [
    "",
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
  const [section, setSection] = useState(sections[0].value);
  const [selectedGrade, setSelectedGrade] = useState("");

  // The following function handles which section will be displayed.
  const handleSection = (event) => {
    // console.log(event.target.value);
    // It checks if the staffSections includes the params that's passed through the function. If it does then the selectedGrade to be displayed will only be the section, since they don't contain grades.
    if (staffSections.includes(event.target.value)) {
      setSelectedGrade(event.target.value);
      setSection(sections[0].value);
      // If by the other hand, the params is not included in the staffSections, it means it is a student grade and a class needs to be selected.
    } else {
      setSection(event.target.value);
    }
  };

  const checkRented = async () => {
    const response = await fetch(`${hostbase}/books/rented`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      showNotification(
        "Error",
        "Rented Books data could not be fetched. Please contact ICT support."
      );
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
        // alert(
        //   "Rented Books data could not be fetched. Please contact ICT support."
        // );
        // showNotification(
        //   "Error",
        //   "Rented Books data could not be fetched. Please contact ICT support."
        // );
      });
  });
  return (
    <>
      <div className="circulation-sections">
        {/* The sections array is mapped in buttons, so that the user can choose which section it wants to see. */}
        <div>
          <select name="" id="section-handler" onChange={handleSection}>
            {sections.map((number) => (
              <option key={number.value} value={number.value}>
                {number.text}
              </option>
            ))}
          </select>
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
      <Group
        rentedBooks={rentedBooks}
        showNotification={showNotification}
        selectedGrade={selectedGrade}
      />
    </>
  );
}
