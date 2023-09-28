import React, { useState, useEffect } from "react";
import hostbase from "../../hostbase.js";

import Group from "./circulation/Group.jsx";
import "../books/circulation.css";

export default function Circulation({ showNotification }) {
  // First, all of the sections available in the school are declared inside an array called sections.
  const sections = [
    { value: "", text: "--Choose a grade or section--" },
    { value: "3A", text: "3A" },
    { value: "3B", text: "3B" },
    { value: "3C", text: "3C" },
    { value: "4A", text: "4A" },
    { value: "4B", text: "4B" },
    { value: "4C", text: "4C" },
    { value: "5A", text: "5A" },
    { value: "5B", text: "5B" },
    { value: "5C", text: "5C" },
    { value: "6A", text: "6A" },
    { value: "6B", text: "6B" },
    { value: "6C", text: "6C" },
    { value: "7A", text: "7A" },
    { value: "7B", text: "7B" },
    { value: "7C", text: "7C" },
    { value: "8A", text: "8A" },
    { value: "8B", text: "8B" },
    { value: "8C", text: "8C" },
    { value: "9A", text: "9A" },
    { value: "9B", text: "9B" },
    { value: "9C", text: "9C" },
    { value: "10A", text: "10A" },
    { value: "10B", text: "10B" },
    { value: "10C", text: "10C" },
    { value: "11A", text: "11A" },
    { value: "11B", text: "11B" },
    { value: "11C", text: "11C" },
    { value: "12A", text: "12A" },
    { value: "12B", text: "12B" },
    { value: "12C", text: "12C" },
    { value: "13A", text: "13A" },
    { value: "13B", text: "13B" },
    { value: "13C", text: "13C" },
    { value: "STAFF", text: "STAFF" },
  ];

  // After that, several states are declared for the following:
  /**
   * rentedBooks = Which will contain the books rented to the selected section/grade
   * selectedGrade = Which will manage the selected grade for the students sections.
   */
  const [rentedBooks, setRentedBooks] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");

  // The following function handles which section will be displayed.
  const handleSection = (event) => {
    setSelectedGrade(event.target.value);
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
