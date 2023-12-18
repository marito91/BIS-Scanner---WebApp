import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./menu.css"; // You can create this CSS file to style the component
import devices from "../assets/devices.svg";
import books from "../assets/books.svg";
import textbooks from "../assets/textbooks.svg";
import dashboard from "../assets/dashboard.svg";
import settings from "../assets/settings.svg";
import logout from "../assets/logout.svg";
import logo from "../assets/logo.png";
import chevron from "../assets/chevron-right.svg";

const menuList = [
  { icon: dashboard, text: "Dashboard" },
  { icon: devices, text: "Devices" },
  { icon: books, text: "Books" },
  { icon: textbooks, text: "Textbooks" },
  { icon: settings, text: "Settings" },
  { icon: logout, text: "Log out" },
];

export default function Menu({ logout }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    if (menuList[index].text === "Log out") {
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        logout(); // Call the logout function when "Log out" is confirmed
      }
    } else {
      setSelectedItem(index);
    }
  };

  function getLinkForItem(item) {
    switch (item.text) {
      case "Dashboard":
        return "/";
      case "Devices":
        return "/devices";
      case "Books":
        return "/books";
      case "Textbooks":
        return "/textbooks";
      case "Settings":
        return "/settings";
      default:
        return "/";
    }
  }

  return (
    <div className="menu-container">
      <div className="logo-box">
        <img src={logo} alt="" />
      </div>
      <p
        style={{
          color: "#999999",
          margin: "0 35px",
          padding: "0",
          cursor: "text",
          textAlign: "left",
        }}
      >
        Main Menu
      </p>
      <ul className="menu-items">
        {menuList.map((item, index) => (
          <Link
            to={getLinkForItem(item)}
            className={`menu-item-link ${
              selectedItem === index ? "selected-link" : ""
            }`}
          >
            <li
              key={index}
              className={`${selectedItem === index ? "selected" : ""}`}
              onClick={() => handleItemClick(index)}
            >
              <img src={item.icon} alt={`Item ${index}`} />
              <span className="menu-item-text">{item.text}</span>
              {selectedItem === index && <img src={chevron} alt="" />}
            </li>
          </Link>
        ))}
      </ul>
      <p
        style={{
          bottom: "0",
          textAlign: "left",
          color: "#999999",
          margin: "0 10px",
        }}
      >
        British International School App © 2022&nbsp;Barranquilla, Colombia
      </p>
    </div>
  );
}
