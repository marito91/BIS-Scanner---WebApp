"use client";

import React from "react";
import pic from "../../src/assets/student.png";
// import waiting from "../../src/assets/waiting.svg";

// Shape of the fields actually read from `student`. Textbooks.tsx's own
// `Student` interface isn't exported, so this is redeclared here based on
// usage — same approach lib/auth.ts documents for Devices.tsx's LoggedUser.
interface StudentInfo {
  name: string;
  lastName: string;
  grade: string;
  email: string;
}

interface TextBookUserProps {
  document: string;
  handleDocument: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getStudent: (document: string) => void;
  student: StudentInfo;
}

export default function TextBookUser({
  document,
  handleDocument,
  getStudent,
  student,
}: TextBookUserProps) {
  return (
    <div className="tb-student-loader">
      <img src={pic.src} alt="" />

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
