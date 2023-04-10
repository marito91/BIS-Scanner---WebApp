import React from "react";
import jwtDecode from "jwt-decode";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const loggedUser = jwtDecode(token);
  const name = loggedUser.first;
  return (
    <div style={{ padding: "3rem" }}>
      <h1>Welcome, {name}</h1>
      <h2>
        Please head on to either the{" "}
        <strong style={{ color: "red" }}>Devices</strong> or the{" "}
        <strong style={{ color: "red" }}>Books</strong> section.
      </h2>
    </div>
  );
}
