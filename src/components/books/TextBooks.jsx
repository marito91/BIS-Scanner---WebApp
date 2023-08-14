import React, { useState } from "react";
import hostbase from "../../hostbase.js";

import "../books/textbooks.css";

export default function TextBooks({ showNotification }) {
  const textBooks = [
    {
      grade: [3],
      text: "Cambridge Primary Science Stage 3 Learner's Book 3",
      sample: "",
    },
    {
      grade: [3],
      text: "Collin's Primary English 3 Student's book",
      sample: "",
    },
    { grade: [3], text: "Collins Math 3 placeholder", sample: "" },
    {
      grade: [4],
      text: "Cambridge Primary Science Stage 4 Learner's Book 4",
      sample: "",
    },
    {
      grade: [4],
      text: "Collin's Primary English 4 Student's book",
      sample: "",
    },
    { grade: [4], text: "Collins Math 4 placeholder", sample: "" },
    {
      grade: [5],
      text: "Cambridge Primary Science Stage 5 Learner's Book 5",
      sample: "",
    },
    {
      grade: [5],
      text: "Collin's Primary English 5 Student's book",
      sample: "",
    },
    { grade: [5], text: "Collins Math 5 placeholder", sample: "" },
    {
      grade: [6],
      text: "Cambridge Primary Science Stage 6 Learner's Book 6",
      sample: "",
    },
    {
      grade: [6],
      text: "Collin's Primary English 6 Student's book",
      sample: "",
    },
    { grade: [6], text: "Collins Math 6 placeholder", sample: "" },
    { grade: [7], text: "Sciences MYP by Concept 1", sample: "" },
    {
      grade: [7],
      text: "MYP Mathematics a concept-based approach 1",
      sample: "",
    },
    { grade: [8], text: "Sciences MYP by Concept 2", sample: "" },
    {
      grade: [8],
      text: "MYP Mathematics a concept-based approach 2",
      sample: "",
    },
    { grade: [9], text: "Sciences MYP by Concept 3", sample: "" },
    {
      grade: [9],
      text: "MYP Mathematics a concept-based approach 3",
      sample: "",
    },
    {
      grade: [10, 11],
      text: "MYP Mathematics a concept-based approach 4 & 5 Standard",
      sample: "",
    },
    {
      grade: [10, 11],
      text: "MYP Mathematics a concept-based approach 4 & 5 Extended",
      sample: "",
    },
    { grade: [10, 11], text: "Biology MYP by concept 4 & 5", sample: "" },
    { grade: [10, 11], text: "Physics MYP by concept 4 & 5", sample: "" },
    { grade: [10, 11], text: "Chemistry MYP by concept 4 & 5", sample: "" },
    {
      grade: [12, 13],
      text: "IB Mathematics: analysis and approaches",
      sample: "",
    },
    {
      grade: [12, 13],
      text: "IB Mathematics: applications and interpretation",
      sample: "",
    },
    { grade: [12, 13], text: "IB Biology Course Book", sample: "" },
    { grade: [12, 13], text: "IB Physics Course Book", sample: "" },
    { grade: [12, 13], text: "IB Chemistry Course Companion", sample: "" },
    { grade: [12, 13], text: "IB Psychology Course Companion", sample: "" },
    { grade: [12, 13], text: "IB Economics Course Companion", sample: "" },
    { grade: [12, 13], text: "IB French B Course Companion", sample: "" },
    { grade: [12, 13], text: "IB English B IB prepared", sample: "" },
    {
      grade: [12, 13],
      text: "IB English A: Language and Literature",
      sample: "",
    },
  ];

  function stringRemove(str) {
    let result = str.replace(/[^\d]/g, "");
    return result;
  }

  const [document, setDocument] = useState("");
  const [student, setStudent] = useState({
    document: 0,
    section: "",
    grade: "",
    name: "",
    lastName: "",
    email: "",
    blocked: false,
    hasDeviceRented: false,
    hasBookRented: false,
    hasTextBookRented: false,
    devicehistory: [],
    bookHistory: [],
    textBookHistory: [],
  });
  const [observations, setObservations] = useState("");

  const handleDocument = (event) => {
    const value = event.target.value;
    setDocument(value);
  };

  const handleObservations = (event) => {
    const value = event.target.value;
    setObservations(value);
  };

  function getStudent(document) {
    // A cleaning of selected sample values must be made first since maybe a student is loaded by accident. So to make sure that sampleValues stays in blank before loading the information.
    setSampleValues({});
    fetch(`${hostbase}/textbooks/loadStudent`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ document }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "ok") {
          // showNotification("Alert", res.msg);
          setStudent(res.student);
        } else {
          showNotification("Error", res.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "A connection with the server could not be established when trying to search for a book. Please contact ICT support."
        );
      });
  }

  const [sampleValues, setSampleValues] = useState({});

  const handleSampleChange = (event, textbookText) => {
    const newSampleValues = {
      ...sampleValues,
      [textbookText]: event.target.value,
    };
    setSampleValues(newSampleValues);
  };

  // Function to handle assigning selected textbooks
  const assignTextBooks = () => {
    // Send selectedTexts to the backend or perform any desired action
    const information = [student, sampleValues, observations];
    console.log(information);

    // Create an array of objects for sending to backend
    const textbooksWithSamples = [];
    for (const [title, sample] of Object.entries(sampleValues)) {
      textbooksWithSamples.push({ title, sample });
    }
    // Create a formatted string for the confirmation message
    const confirmationMessage = textbooksWithSamples
      .map((textbook) => `${textbook.title}: ${textbook.sample},`)
      .join("\n");

    const confirmation = window.confirm(
      `You are assigning the following texts to ${
        student.name + " " + student.lastName
      }:\n${confirmationMessage}\nObservations: ${observations}\nAre you completely sure?`
    );

    if (confirmation) {
      fetch(`${hostbase}/textbooks/assign`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ student, textbooksWithSamples, observations }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "ok") {
            // showNotification("Alert", res.msg);
            showNotification("Alert", "Info received succesfully");
            // A cleaning of all state must be made when the textbooks are assigned
            setSampleValues({});
            setDocument("");
            setStudent({
              document: 0,
              section: "",
              grade: "",
              name: "",
              lastName: "",
              email: "",
              blocked: false,
              hasDeviceRented: false,
              hasBookRented: false,
              hasTextBookRented: false,
              devicehistory: [],
              bookHistory: [],
              textBookHistory: [],
            });
            setObservations("");
          } else {
            showNotification("Error", res.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
          alert(
            "A connection with the server could not be established when trying to search for a book. Please contact ICT support."
          );
        });
    }

    // A cleaning of all state must be made when the textbooks are assigned
    setSampleValues({});
    setDocument("");
    setStudent({
      document: 0,
      section: "",
      grade: "",
      name: "",
      lastName: "",
      email: "",
      blocked: false,
      hasDeviceRented: false,
      hasBookRented: false,
      hasTextBookRented: false,
      devicehistory: [],
      bookHistory: [],
      textBookHistory: [],
    });
    setObservations("");
  };

  return (
    <div className="textbooks-container">
      <div className="student-loader">
        <label htmlFor="">Student:</label>
        <input
          type="text"
          placeholder="Please enter student barcode"
          value={document}
          onChange={handleDocument}
        />
        <button onClick={() => getStudent(document)}>Load</button>
      </div>
      <div style={{ margin: "20px 0", padding: "0.5rem" }}>
        <table>
          <thead>
            <tr>
              <th style={{ borderRadius: "10px 0 0 0" }}>Name</th>
              <th>Grade</th>
              <th>Section</th>
              <th style={{ borderRadius: "0 10px 0 0" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>Name</span>
                {student.name + " " + student.lastName}
              </td>
              <td>
                <span>Grade</span>
                {student.grade}
              </td>
              <td>
                <span>Section</span>
                {student.section}
              </td>
              <td>
                <span>Email</span>
                {student.email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="textbooks-list">
        <div className="textbooks-grid">
          {textBooks
            .filter((textbook) =>
              textbook.grade.includes(Number(stringRemove(student.grade)))
            )
            .map((textbook, index) => (
              <div className="checkboxes" key={textbook.text}>
                {/* <input
                  type="checkbox"
                  name=""
                  id={textbook.text}
                  onChange={(event) => handleCheckboxChange(event, textbook)}
                /> */}
                <label htmlFor={textbook.text}>{textbook.text}</label>
                <input
                  type="text"
                  value={sampleValues[textbook.text] || ""}
                  placeholder="#"
                  onChange={(event) => handleSampleChange(event, textbook.text)}
                />
              </div>
            ))}
        </div>
        <div className="actions">
          <input
            type="text"
            value={observations}
            onChange={handleObservations}
            placeholder="Observations?"
          />
          <button onClick={() => assignTextBooks()}>Assign</button>
        </div>
      </div>
    </div>
  );
}
