"use client";

import { useState } from "react";
import Link from "next/link";

import "../src/components/menu.css";
import devices from "@/assets/devices.svg";
import books from "@/assets/books.svg";
import textbooks from "@/assets/textbooks.svg";
import dashboard from "@/assets/dashboard.svg";
import settings from "@/assets/settings.svg";
import logout from "@/assets/logout.svg";
import logo from "@/assets/logokc.png";
import chevron from "@/assets/chevron-right.svg";

// Migrated from src/components/Menu.jsx. react-router-dom's <Link to> becomes
// next/link's <Link href>; everything else (selection state, the confirm on
// "Log out", the link map) is unchanged. In the CRA app App.js only rendered
// <Menu> when auth() passed — that gate now lives in proxy.ts, which is the
// only way the (protected) layout that renders this component is reached, so
// there is no auth check here.

const menuList = [
  { icon: dashboard, text: "Dashboard" },
  { icon: devices, text: "Devices" },
  { icon: books, text: "Books" },
  { icon: textbooks, text: "Textbooks" },
  { icon: settings, text: "Settings" },
  { icon: logout, text: "Log out" },
];

export default function Menu({ logout }: { logout: () => void }) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    if (menuList[index].text === "Log out") {
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        logout(); // Call the logout function when "Log out" is confirmed
      }
    } else {
      setSelectedItem(index);
    }
  };

  function getLinkForItem(item: (typeof menuList)[number]) {
    switch (item.text) {
      case "Dashboard":
        return "/home";
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
        <img src={logo.src} alt="" />
      </div>
      <p
        style={{
          color: "#999999",
          marginTop: "10px",
          padding: "0",
          cursor: "text",
          textAlign: "center",
        }}
      >
        Main Menu
      </p>
      <ul className="menu-items">
        {menuList.map((item, index) => (
          <Link
            key={index}
            href={getLinkForItem(item)}
            className={`menu-item-link ${
              selectedItem === index ? "selected-link" : ""
            }`}
          >
            <li
              key={index}
              className={`${selectedItem === index ? "selected" : ""}`}
              onClick={() => handleItemClick(index)}
            >
              <img src={item.icon.src} alt={`Item ${index}`} />
              <span className="menu-item-text">{item.text}</span>
              {selectedItem === index && <img src={chevron.src} alt="" />}
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
