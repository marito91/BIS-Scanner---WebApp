import React from "react";
import jwtDecode from "jwt-decode";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const loggedUser = jwtDecode(token);
  const name = loggedUser.first;
  return (
    <div style={{ padding: "3rem" }}>
      <h1>Welcome {name}</h1>
      <h2>This section is not available yet.</h2>
      <h2>
        Please click on either the{" "}
        <strong style={{ color: "blue" }}>Devices</strong> or the{" "}
        <strong style={{ color: "blue" }}>Books</strong> tab above.
      </h2>
    </div>
  );
}
