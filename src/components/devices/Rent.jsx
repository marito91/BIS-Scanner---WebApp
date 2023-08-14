import React, { useState } from "react";
import hostbase from "../../hostbase.js";

export default function Rent({ updateRented, entryCount, showNotification }) {
  // This user object, which is managed by states, will contain the information that's sent to server regarding the renting of devices.
  const [user, setUser] = useState({
    document: "",
    device: "",
    number: 0,
    conditions: "",
  });
  // The function handlechange() determines the values that will be assigned under the user object when a device is going to be rented.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };

  // The function handleCode() is meant to work only when the barcode scanner component is implemented. Since the function is not implemented right now, the code is commented. It will assign the scanned barcode to the user.document key.
  // const handleCode = (code) => {
  //   setUser((user) => ({ ...user, document: code }));
  // };

  // The rent() function will be in charge of sending the user object information to the server after validating that everything is ok to request a device rental
  function rent() {
    // If user.document is different from a valid document number, then an alert will be sent asking for a correct number.
    if (
      user.document === "----------" ||
      user.document === "" ||
      isNaN(user.document)
    ) {
      showNotification("Error", "Please enter a valid Barcode");
    } else {
      // It doesn't accept the device number if is not in the 0-30 range, since this is the actual number of available devices. If the number changes physically in the library or IT department, then this part needs to be adjusted.
      if (user.number > 30 || user.number <= 0) {
        showNotification(
          "Error",
          "Please enter a valid number between 1 and 30."
        );
        // If all validations are ok, then the user object will be sent to the server side.
      } else {
        fetch(`${hostbase}/devices/rent`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ user }),
        })
          .then((res) => res.json())
          .then((res) => {
            // Client will receive an alert telling if rental was successful or not.
            showNotification("Alert", res.msg);
            // Lists of active rented devices and entries will be updated, and the window will reload after that.
            updateRented();
            entryCount();
            setTimeout(() => {
              window.location.href = "/devices";
            }, 4000); // delay the navigation for 3 seconds (adjust the delay time as needed)
          })
          // If there's an error, an alert asking for IT support will be sent.
          .catch(function (e) {
            console.log(e.message);
            showNotification(
              "Error",
              "A connection with the server could not be established when trying to rent a device. Please contact ICT support."
            );
          });
        // Values are set to default in the user object again.
        setUser({
          document: "",
          device: "",
          number: 0,
          conditions: "",
        });
      }
    }
  }

  return (
    <div className="rent-module">
      <h2>Rent</h2>
      <div className="modules-forms">
        {/* <Barcode handleCode={handleCode} user={user} /> */}
        <label>Document</label>
        <input
          name="document"
          value={user.document}
          type="text"
          placeholder="Student or teacher document"
          onChange={handleChange}
          required
        ></input>
        <label>Device</label>
        <select
          id="modules-select"
          name="device"
          onChange={handleChange}
          value={user.device}
          required
        >
          <option>- Device -</option>
          <option>ChromeBook</option>
          <option>iPad</option>
        </select>
        <label>Number</label>
        <input
          name="number"
          value={user.number}
          type="number"
          placeholder="1, 16, 28, etc..."
          onChange={handleChange}
          required
        ></input>
        <label>Observations</label>
        <textarea
          style={{ fontSize: "16px" }} // This is done because when using mobile it zooms.
          name="conditions"
          value={user.conditions}
          type="text"
          rows={9}
          placeholder="Good conditions or broken screen, small damage, etc."
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="modules-btns">
        <button onClick={() => rent()}>Rent</button>
      </div>
    </div>
  );
}
