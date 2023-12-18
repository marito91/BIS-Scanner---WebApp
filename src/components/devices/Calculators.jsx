import React from "react";

import close from "../../assets/x.svg";

export default function Calculators({
  rentedCalcs,
  returnCalc,
  closeCalcModal,
}) {
  // The function arrangeName takes the data coming from server side (first and last names) and capitalizes the first letter of each string so that it can be displayed in the actives list.
  function arrangeName(strFirst, strLast) {
    // Strings first values are taken and lowered cased.
    const first = strFirst.toLowerCase().split(" ")[0];
    const last = strLast.toLowerCase().split(" ")[0];
    // The first letters in each string are capitalized after that.
    const namesUpper = [];
    for (const n of [first, last]) {
      namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    // Finally, both strings are joined and returned by the function to be shown under the devices icons.
    return namesUpper.join(" ");
  }
  return (
    <>
      <div className="user-info calcs">
        <h2>Rented Calculators</h2>
        <table>
          <thead>
            <tr>
              <td>Student</td>
              <td>Calculator</td>
              <td>Date Rented</td>
            </tr>
          </thead>
          <tbody>
            {rentedCalcs.map((calc) => (
              <tr className="calc-row" onClick={() => returnCalc(calc.number)}>
                <td htmlFor="">{arrangeName(calc.name, calc.lastName)}</td>
                <td id="number" htmlFor="">
                  {"#" + calc.number}
                </td>
                <td htmlFor="">{calc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="close-button-container">
          <img src={close} alt="" onClick={() => closeCalcModal(false)} />
        </div>
      </div>
    </>
  );
}
