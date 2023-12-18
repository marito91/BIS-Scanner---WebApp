import React, { useState, useEffect, useMemo } from "react";
// import React from "react";
import jwtDecode from "jwt-decode";
import hostbase from "../hostbase.js";

// import TextBooks from "./textbooks/Textbooks.jsx";
import TextBookCirculation from "./textbooks/TextBookCirculation.jsx";
import TextBookUser from "./textbooks/TextBookUser.jsx";
import RentTextbooks from "./textbooks/RentTextbooks.jsx";
import textBooks from "./textbooks/txtbooks.js";

import "./textbooks/textbooks.css";
import bookshelves from "../assets/bookshelves.svg";

export default function Textbooks({ showNotification, socket }) {
  // User is being checked to see what tools are going to be available for them.
  const token = localStorage.getItem("token");
  const loggedUser = jwtDecode(token);
  // const userType = loggedUser.userType;
  const admin = loggedUser.first + " " + loggedUser.last;

  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  MANAGE NUMBER OF RENTED TEXTBOOKS // // // // // // // //
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /

  const [rentedTextbooks, setRentedTexbooks] = useState([]);

  const checkRented = async () => {
    const response = await fetch(`${hostbase}/textbooks/rented`, {
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
  // Memoize the result of the checkRented function
  const memoizedRentedTextbooks = useMemo(() => {
    return checkRented().then((res) => res.data);
    // eslint-disable-next-line
  }, []);
  // Use the memoized result
  useEffect(() => {
    memoizedRentedTextbooks
      .then((data) => {
        setRentedTexbooks(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [memoizedRentedTextbooks]);

  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  MANAGE TEXTBOOK RENTAL // // // // // // // //
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /

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
  const [rentedtbs, setRentedtbs] = useState([]);

  const [observations, setObservations] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  const handleDocument = (event) => {
    const value = event.target.value;
    setDocument(value);
  };

  const handleObservations = (event) => {
    const value = event.target.value;
    setObservations(value);
  };

  function getStudent(document) {
    if (isNaN(document)) {
      showNotification("Error", "Please enter a valid document.");
    } else {
      // A cleaning of selected sample values must be made first since maybe a student is loaded by accident. So to make sure that sampleValues stays in blank before loading the information.
      setSampleValues({});
      fetch(`${hostbase}/textbooks/loadStudent`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ document, admin }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "ok") {
            // showNotification("Alert", res.msg);
            setStudent(res.student);
            setRentedtbs(res.rentedTextBooks);
            setIsLoaded(true);
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
        body: JSON.stringify({
          student,
          textbooksWithSamples,
          observations,
          admin,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "ok") {
            // showNotification("Alert", res.msg);
            showNotification("Success", "Info received succesfully");
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
            setRentedtbs([]);
            setIsLoaded(false);
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
    setRentedtbs([]);
    setIsLoaded(false);
  };

  return (
    <div className="textbooks-section">
      <div className="tb-stat-1">
        <h1>3054</h1>
        <h1>Textbooks</h1>
      </div>
      <div className="tb-stat-2">
        <h1>{rentedTextbooks.length || "?"}</h1>
        <h1>Active Users</h1>
      </div>
      <div className="tb-stat-3">
        <h1>2289</h1>
        <h1>Rented</h1>
      </div>
      <div className="tb-circulation-container">
        <TextBookCirculation
          showNotification={showNotification}
          admin={admin}
          rentedTextbooks={rentedTextbooks}
        />
      </div>
      <div className="tb-user">
        <TextBookUser
          document={document}
          handleDocument={handleDocument}
          getStudent={getStudent}
          student={student}
        />
      </div>
      <div className="tb-rent-module">
        {isLoaded ? (
          <RentTextbooks
            textBooks={textBooks}
            rentedtbs={rentedtbs}
            stringRemove={stringRemove}
            student={student}
            sampleValues={sampleValues}
            handleSampleChange={handleSampleChange}
            observations={observations}
            handleObservations={handleObservations}
            assignTextBooks={assignTextBooks}
            showNotification={showNotification}
          />
        ) : (
          <div className="unloaded-tbs">
            <img src={bookshelves} alt="" />
            <h4>No textbooks loaded</h4>
          </div>
        )}
      </div>
    </div>
  );
}
