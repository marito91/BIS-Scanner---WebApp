import React from "react";

export default function RentTextbooks({
  textBooks,
  rentedtbs,
  stringRemove,
  student,
  sampleValues,
  handleSampleChange,
  observations,
  handleObservations,
  assignTextBooks,
  unassignTextBooks,
  showNotification,
}) {
  return (
    <>
      {/* <div className="rented-tb-table">
        {rentedtbs.map((textbook) => (
          <div key={textbook.title}>
            <label id="tb-title" htmlFor="">
              {textbook.title}
            </label>
            <label id="tb-number" htmlFor="">
              {textbook.number}
            </label>
            <label id="tb-date" htmlFor="">
              {textbook.dateRented}
            </label>
          </div>
        ))}
      </div> */}
      <div className="available-tb-list">
        <div className="tb-grid">
          {textBooks
            .filter((textbook) =>
              textbook.grade.includes(Number(stringRemove(student.grade)))
            )
            .map((textbook, index) => (
              <div className="tb-checkboxes" key={textbook.text}>
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
        <div className="tb-actions">
          <input
            id="observations-input"
            type="text"
            value={observations}
            onChange={handleObservations}
            placeholder="Observations?"
          />
          <div className="action-btns">
            <button className="action-btn" onClick={() => assignTextBooks()}>
              Assign
            </button>
            {/* <button className="action-btn" onClick={() => unassignTextBooks()}>
              Return
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
