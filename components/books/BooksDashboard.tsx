"use client";

import React from "react";

import rent from "../../src/assets/rent.svg";
import giveBack from "../../src/assets/return.svg";
import edit from "../../src/assets/edit.svg";
import read from "../../src/assets/read.svg";

interface BooksDashboardProps {
  admin: string;
  showNotification: (title: string, message: string) => void;
  setRentModalIsVisible: (visible: boolean) => void;
  setReturnModalIsVisible: (visible: boolean) => void;
  setBookEditModalIsVisible: (visible: boolean) => void;
}

export default function BooksDashboard({
  admin,
  showNotification,
  setRentModalIsVisible,
  setReturnModalIsVisible,
  setBookEditModalIsVisible,
}: BooksDashboardProps) {
  return (
    <>
      <div className="book-dashboard-container">
        <h3>Knowledge Centre Books</h3>
        <div className="container-info">
          <div className="tools">
            <button
              className="btn-container"
              onClick={() => setRentModalIsVisible(true)}
            >
              <div className="button-content">
                <img src={rent.src} alt="" className="button-icon" />
                <span className="button-text">New Rent</span>
              </div>
            </button>
            <button
              className="btn-container"
              onClick={() => setReturnModalIsVisible(true)}
            >
              <div className="button-content">
                <img src={giveBack.src} alt="" className="button-icon" />
                <span className="button-text">Return</span>
              </div>
            </button>
            <button
              className="btn-container"
              onClick={() => setBookEditModalIsVisible(true)}
            >
              <div className="button-content">
                <img src={edit.src} alt="" className="button-icon" />
                <span className="button-text">Edit Books</span>
              </div>
            </button>
          </div>
          <div>
            <img src={read.src} id="reading" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
