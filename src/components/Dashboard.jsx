import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import hostbase from "../hostbase.js";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const loggedUser = jwtDecode(token);
  const name = loggedUser.first;
  console.log(loggedUser);

  const [blockedUsers, setBlockedUsers] = useState([]);

  // The function loadBooks() will fetch the collection from the server's database.
  const getBlockedUsers = async () => {
    const response = await fetch(`${hostbase}/users/blocked_users`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Information could not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component loads, the collection will be loaded from the information that was fetched in the async function loadBooks()
  useEffect(() => {
    getBlockedUsers()
      .then((res) => {
        setBlockedUsers(res.listOfBlockedUsers);
      })
      .catch((e) => {
        console.log(
          e.message +
            ": " +
            "A connection to the server could not be established. Please contact ICT support."
        );
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome, {name}</h1>
      <h2>
        Please head on to either the{" "}
        <strong style={{ color: "red" }}>Devices</strong> or the{" "}
        <strong style={{ color: "red" }}>Books</strong> section.
      </h2>
      {loggedUser.userType !== "admin" ? (
        <h1>
          This is your first time using this app. I am so glad to have you here!
        </h1>
      ) : (
        <div className="dashboard">
          <div className="blocked-users">
            <h2>Due for today!</h2>
            {!blockedUsers.length > 0 ? (
              <p>There is no data available right now.</p>
            ) : (
              <></>
            )}
            {blockedUsers.map((blockedUser) => (
              <>
                <label htmlFor="">
                  Name: {blockedUser.name + " " + blockedUser.lastName}
                </label>
                <br />
                <label htmlFor="">
                  Section: {blockedUser.section + " " + blockedUser.grade}
                </label>
              </>
            ))}
          </div>
          <div className="blocked-users">
            <h2>Blocked Users</h2>
            {!blockedUsers.length > 0 ? (
              <p>There are currently no blocked users.</p>
            ) : (
              <></>
            )}
            {blockedUsers.map((blockedUser) => (
              <>
                <label htmlFor="">
                  Name: {blockedUser.name + " " + blockedUser.lastName}
                </label>
                <br />
                <label htmlFor="">
                  Section: {blockedUser.section + " " + blockedUser.grade}
                </label>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
