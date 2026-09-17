"use client";

import React from "react";

// All of the corresponding media to make the details easier to read is imported.
import tb from "../../src/assets/textbook.png";

interface TextbookEntry {
  title: string;
  sample: string | number;
  dateRented: string;
}

// Shape of `textbook`, based on the fields actually read below. Mirrors
// TextBookCirculation.tsx's own (un-exported) RentedTextbookGroup shape,
// redeclared here the same way rather than importing it.
interface SelectedTextbookInfo {
  name: string;
  lastName: string;
  document: number;
  section: string;
  grade: string;
  email: string;
  textbooks: TextbookEntry[];
}

interface SelectedTextbookProps {
  textbook: SelectedTextbookInfo;
  setSelectedTextbook: (node: React.ReactNode) => void;
  setShowList: (visible: boolean) => void;
  unassignOne: (userThatHasTb: any, textbookToUnassign: any) => void;
}

// Since the component needs information that's passed from the parent, the props for book and setHoveredBook are passed. The details will be extracted from the book's keys, and the setHoveredBook will be used to being set to null when closing the window.
export default function SelectedTextbook({
  textbook,
  setSelectedTextbook,
  setShowList,
  unassignOne,
}: SelectedTextbookProps) {
  function closeBookSummary() {
    setSelectedTextbook(<></>);
    setShowList(true);
  }
  console.log(textbook);

  return (
    <>
      {/* <div className="selected-user" style={{ textAlign: "center" }}>
        <img id="tb-cover" src={tb} alt="" />
      </div> */}
      <div className="hovered-tb-user">
        <div className="selected-user">
          <img id="tb-cover" src={tb.src} alt="" />
        </div>
        <div className="hovered-tb-user-info">
          <label htmlFor="" id="title">
            {textbook.name + " " + textbook.lastName}
          </label>
          <label htmlFor="" id="">
            {textbook.document}
          </label>
          <label htmlFor="" id="">
            {textbook.section + " - " + textbook.grade}
          </label>
          <label htmlFor="" id="email">
            {textbook.email}
          </label>
        </div>
        <div className="textbooks-info">
          {textbook.textbooks.map((tb) => (
            <div className="tb">
              <label htmlFor="">{tb.title}</label>
              <label htmlFor="">Sample #{tb.sample}</label>
              <label htmlFor="">Rented on {tb.dateRented}</label>
              <div className="action-btns">
                <button
                  className="action-btn"
                  onClick={() => unassignOne(textbook, tb)}
                  // onClick={() => console.log(tb)}
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="tb-close-btn-container">
          {/* <button onClick={() => setHoveredBook(<></>)}>Close</button> */}
          <button id="close-btn" onClick={() => closeBookSummary()}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
