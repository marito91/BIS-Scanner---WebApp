// Libraries, dependencies, etc...
import React, { useState } from "react";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./authentication/auth";

// This application needs various dependencies installed in order to work properly. The requirements will be mentioned below:

/** App Requirements
 * npm install --save react-barcode-reader
 * npm install react-router-dom
 * npm install --save jwt-decode
 * Agregar el hostbase.js
 * Aplicar el open ssl
 * Remover el Browser especificado de package.json
 */

// Main Components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./components/Index.jsx";
import Restricted from "./components/Restricted.jsx";

// App Components
import Devices from "./components/Devices.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Books from "./components/Books.jsx";

// This application will let users manage all of the services regarding the management of books and devices lent by the library. Admin users will be able to manage everything and check all of the data traffic and movements the app does. The app is divided into 2 main sections: Devices & Books. Both of them work in a similar way but have many differences in their components based on the needs each service requires. For the time being, this app only works for admins who have access, so that students don't have any access.

// Each component will have the required libraries, packages and modules imported directly. Even css will be imported so that it can be easier to manage in case something needs to be changed. CSS will be assigned by sections and then by folders, each depending on how many folder and sub components each app component branches into.

// The Devices section is composed of 5 sub components.

/** More information of each component for the Devices setion is explained below:
 * Rent: Admin assigns a user via a barcode scanner or manually and selects a device to assign to the person.
 * User: Displays the most important information about a user -> Name, rented device, date it was rented and section he/she belongs to.
 * Actives: Displays the general information about the section -> Active users, devices available, rented devices, stats, etc.
 * Entries: Admin can download information about the app usage (devices section) by filtering it with different params such as date, document, and active users.
 * Search: Admin can search for an active device to check who has it rented.
 */

// The Books section is composed of 3 sub folders or sections. Each section has different sub components based on the needs of each one. That's why these are subject to change.

/** More information of each component for the Books section is explained below:
 * Services
 *  This section contains the main services of the libraries: Book rental and return.
 *    NewBook: In this component, just like in the Rent in Devices section, lets the admin assign a book to a user with a return date both manually or with barcode.
 *    ReturnBook: This component lets the admin scan the barcode for the book and return it. It also asks if the admin wants to fine the user that returns late.
 * Circulation
 *  This section organizes all of the actives users in the database. Every student or teacher that has a book rented will show up in this section.
 *    Group: This component varies depending on the section the admin wants to check. When info is deployed, admin can send notifications to selected users.
 * Management
 *  This section contains all of the services a library needs. Admins can insert new books, update old ones and even delete them. General table of data is shown too.
 *    Collection: Will display in a table all of the active books in the database. Admin can select a book to display more information.
 *    HoveredBook: Shows all of the info from the selected book in the Collection component. If a user wants to know more about one, here it will find the info.
 *    NewBook: Just as the name states, creates a new entry in the database. Admin enters all of the corresponding information about a book.
 *    ManageBook: In this component, admin can search for a book and decide if it needs to be updated or deleted.
 *    Spinner: Component that shows while data is being fetched from server side.
 */

// This component ( -- App() -- ) will manage the rest of the application with react router.

function App() {
  // An object for the user data is created via useState. It will be used across each section accordingly.
  const [user, setUser] = useState({
    document: "",
    device: "",
    number: "",
    name: "",
    section: "",
    date: "",
    time: "",
    email: "",
    comments: "",
  });

  // This function works based on the information stored in localstorage. It removes the token from the localstorage and reloads the page so that the user logs out.
  function logout() {
    const confirmation = window.confirm("Do you want to log out?");
    if (confirmation) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }

  return (
    <>
      <BrowserRouter>
        {/* The header will always stay on top. On mobile, section management will be passed to the footer.  */}
        <Header logout={logout} />
        <Routes>
          {/* This is the landing page. No props needed in the index page. If the user is already signed in, then it leads directly to the dashboard. */}
          <Route path="/" element={auth() ? <Dashboard /> : <Index />}></Route>

          {/* This route leads to the dashboard. The restricted component shows in case somebody tries to head into it and is not logged in. */}
          <Route
            path="/home"
            element={auth() ? <Dashboard /> : <Restricted />}
          ></Route>

          {/* This route leads to the devices section, where the user can rent/return devices, check and notify active users and download records for device usage. The user needs to be logged in to be able to use these tools. */}
          <Route
            path="/devices"
            element={
              auth() ? (
                <Devices user={user} setUser={setUser} />
              ) : (
                <Restricted />
              )
            }
          ></Route>

          {/* This route leads to the books section, where the user can rent/return books, add/edit/search/delete books from the school database and check the circulation live. The user needs to be logged in to be able to use these tools.  */}
          <Route
            path="/books"
            element={auth() ? <Books /> : <Restricted />}
          ></Route>
        </Routes>

        {/* The footer section will be displayed when the client is in mobile. The client will be able to access each section in the app via the icons in this section. */}
        <Footer logout={logout} />
      </BrowserRouter>
    </>
  );
}

export default App;
