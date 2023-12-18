import React from "react";
import pic from "../../assets/student.png";
// import waiting from "../../assets/waiting.svg";

export default function TextBookUser({
  document,
  handleDocument,
  getStudent,
  student,
}) {
  return (
    <div className="tb-student-loader">
      <img src={pic} alt="" />

      {student.name === "" ? (
        <div className="not-loaded-student">
          {/* <img src={waiting} alt="" /> */}
          <h4>No user loaded</h4>
        </div>
      ) : (
        <div className="loaded-student">
          <label>{student.name + " " + student.lastName}</label>
          <label>{student.grade}</label>
          <label>{student.email}</label>
        </div>
      )}
      <div className="student-search">
        {/* <label htmlFor="">Student:</label> */}
        <input
          type="text"
          placeholder="Enter student document"
          value={document}
          onChange={handleDocument}
        />
        <button onClick={() => getStudent(document)}>Load</button>
      </div>
    </div>
  );
}
