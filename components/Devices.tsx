"use client";

import React, { useState, useEffect } from "react";

import hostbase from "../lib/hostbase";
import type { SessionUser } from "../lib/auth";
import { useAppState } from "./AppStateProvider";

// NOTE: Actives, Rent, User and Calculators have not migrated yet. They are
// imported from their original src/components/devices/ location via a relative
// cross-tree path; update each import as its target migrates (tracked in BACKLOG.md).
import Actives from "../src/components/devices/Actives.jsx";
import Rent from "../src/components/devices/Rent.jsx";
import User from "../src/components/devices/User.jsx";
import Calculators from "../src/components/devices/Calculators.jsx";

import "../src/components/devices/devices.css";

import add from "../src/assets/add.svg";
// import search from "../src/assets/search.svg";

// Shape of the `active` state as constructed inside this file. `number` is held
// as "" on reset but carries a device number when populated by Actives, hence
// string | number. `conditions` is absent from two of the reset call sites.
interface ActiveDevice {
  document: string;
  device: string;
  number: string | number;
  name: string;
  section: string;
  date: string;
  time: string;
  email: string;
  conditions?: string;
}

// Shape passed to the `setUser` prop. Note `number` is numeric (0) here, unlike
// ActiveDevice.
interface UserState {
  document: string;
  device: string;
  number: number;
  name: string;
  section: string;
  date: string;
  time: string;
  email: string;
}

interface SearchInfo {
  document: string | null;
  date: string | null;
  device: string | null;
  number: string | number;
}

interface DevicesProps {
  loggedUser: SessionUser;
}

export default function Devices({ loggedUser }: DevicesProps) {
  /** Objects used under the devices section
   * active : similar to searchInfo but this object, that also works through state management, shows the information regarding an active device. This will prevent the information to change in different modules.
   */
  const { socket, showNotification } = useAppState();
  const admin = loggedUser.first + " " + loggedUser.last;

  // Was passed down as the `setUser` prop before Devices had its own page;
  // now local state. Note: appears to be fully dead — reset to blank at both
  // call sites below, but nothing in this file or any child ever reads `user`.
  // Left as-is for this migration; tracked in BACKLOG.md as a cleanup candidate.
  const [user, setUser] = useState<UserState>({
    document: "",
    device: "",
    number: 0,
    name: "",
    section: "",
    date: "",
    time: "",
    email: "",
  });

  // Object to show on client side
  const [active, setActive] = useState<ActiveDevice>({
    document: "",
    device: "",
    number: "",
    name: "",
    section: "",
    date: "",
    time: "",
    email: "",
    conditions: "",
  });

  // This array will contain all of the information of the devices currently rented. It will update with the function updatedRented()
  const [rented, setRented] = useState<unknown[]>([]);

  // This array will contain all of the information of the calculators currently rented. It will update with the function updatedRentedCalcs()
  const [rentedCalcs, setRentedCalcs] = useState<unknown[]>([]);

  // This table will be used to count the number of all time rented devices in the application.
  const [entries, setEntries] = useState<number>(0);

  // The async function entryCount() will bring the information of rented devices from the server side.
  const entryCount = async () => {
    const response = await fetch(`${hostbase}/devices/rented_all_time`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component loads, the information fetched from the server side will update and the number of entries will be shown in the section.
  useEffect(() => {
    if (socket) {
      entryCount()
        .then((res) => {
          // res.data === undefined ? setEntries([]) : setEntries(res.data);
          setEntries(res.data);
        })
        .catch((e) => {
          console.log(e.message);
          alert(
            "Number of device entries could not be fetched. Please contact ICT Support."
          );
        });
      socket.on("rentedAllTime", (data) => {
        setEntries(data);
      });
    }

    return () => {
      if (socket) {
        socket.off("rentedAllTime");
      }
    };
  }, [socket]);

  // The function updateRented() updates the list of devices currently rented so that the client knows which devices are currently in circulation by fetching the information from server side.
  const updateRented = async () => {
    const response = await fetch(`${hostbase}/devices/rented`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component loads, the updated list of rented devices is going to be shown. This will let different components to display information regarding their use.
  // useEffect(() => {
  //   updateRented()
  //     .then((res) => {
  //       // console.log(res.listOfRentedDevices);
  //       res.listOfRentedDevices === undefined
  //         ? setRented([])
  //         : setRented(res.listOfRentedDevices);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //       console.log(
  //         "The list of rented devices could not be fetched. Please contact ICT Support."
  //       );
  //     });
  // }, []);

  useEffect(() => {
    if (socket) {
      updateRented()
        .then((res) => {
          res.listOfRentedDevices === undefined
            ? setRented([])
            : setRented(res.listOfRentedDevices);
        })
        .catch((e) => {
          console.log(e.message);
          console.log(
            "The list of rented devices could not be fetched. Please contact ICT Support."
          );
        });
      // Set up a listener for the 'deviceRented' event
      socket.on("deviceRented", (data) => {
        // Update your state with the new data
        setRented(data);
      });
    }

    return () => {
      if (socket) {
        // Clean up event listener when the component unmounts
        socket.off("deviceRented");
      }
    };
  }, [socket]);

  // The function updateRented() updates the list of devices currently rented so that the client knows which devices are currently in circulation by fetching the information from server side.
  const updateRentedCalcs = async () => {
    const response = await fetch(`${hostbase}/devices/rented-calcs`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // When the component loads, the updated list of rented devices is going to be shown. This will let different components to display information regarding their use.
  useEffect(() => {
    if (socket) {
      updateRentedCalcs()
        .then((res) => {
          // console.log(res.listOfRentedDevices);
          res.listOfRentedCalculators === undefined
            ? setRentedCalcs([])
            : setRentedCalcs(res.listOfRentedCalculators);
        })
        .catch((e) => {
          console.log(e.message);
          console.log(
            "The list of rented devices could not be fetched. Please contact ICT Support."
          );
        });
      socket.on("rentedCalcs", (data) => {
        setRentedCalcs(data);
      });
    }

    return () => {
      if (socket) {
        socket.off("rentedCalcs");
      }
    };
  }, [socket]);

  // For managing the renting modal
  const [rentModalIsVisible, setRentModalIsVisible] = useState(false);
  function closeRentModal() {
    setRentModalIsVisible(false);
  }

  // For managing the activeUser modal
  const [isUserVisible, setIsUserVisible] = useState(false);
  function closeUser() {
    setIsUserVisible(false);
    setActive({
      document: "",
      device: "",
      number: "",
      name: "",
      section: "",
      date: "",
      time: "",
      email: "",
    });
  }

  // For managing the calculator modal
  const [calcModalIsVisible, setCalcModalIsVisible] = useState(false);
  function closeCalcModal() {
    setCalcModalIsVisible(false);
  }

  // The function returnDevice will be in charge of managing the return of a device by sending the device information to the server which then notifies the user and updates the information for client side. The function receives a string that contains the device information.
  function returnDevice(rentedDevice: [string, string | number]) {
    // console.log(rentedDevice);
    // The string is split
    const [device, number] = [...rentedDevice];
    if (device === "") {
      showNotification("Error", "Please make sure you select a student first.");
    } else {
      if (
        window.confirm(
          `Are you sure the ${device} #${number} is being returned?`
        )
      ) {
        fetch(`${hostbase}/devices/return`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ device, number, admin }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((res) => {
            // Alerts a message that shows what comes from server side including in which conditions the device was rented so that the client can validate if it is being returned in the same conditions.
            showNotification("Success", res.msg);
            closeUser();
            // The rented list is updated to refresh the page
            updateRented();
            setTimeout(() => {
              window.location.href = "/devices";
            }, 4000); // delay the navigation for 3 seconds (adjust the delay time as needed)
          })
          // If there is an error establishing a connection, an alert is sent.
          .catch(function (e) {
            console.log(e.message);
            showNotification(
              "Error",
              "A connection to the server could not be established when trying to return a device. Please contact ICT Support."
            );
          });
      }
      // NOTE: known bug preserved from the original — the following resets and
      // updateRented() run even when window.confirm is cancelled; only the fetch
      // above is actually gated. Tracked separately in BACKLOG.md.
      closeUser();
      // The objects' keys are returned to their initial values.
      setUser({
        document: "",
        device: "",
        number: 0,
        name: "",
        section: "",
        date: "",
        time: "",
        email: "",
      });
      setActive({
        document: "",
        device: "",
        number: "",
        name: "",
        section: "",
        date: "",
        time: "",
        email: "",
      });
      // The rented list is updated just in case.
      updateRented();
    }
  }

  // The function returnDevice will be in charge of managing the return of a device by sending the device information to the server which then notifies the user and updates the information for client side. The function receives a string that contains the device information.
  function returnCalc(number: string | number) {
    if (number === "") {
      showNotification("Error", "Please make sure you select a student first.");
    } else {
      if (
        window.confirm(
          `Are you sure the Calculator #${number} is being returned?`
        )
      ) {
        fetch(`${hostbase}/devices/return-calc`, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ number, admin }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((res) => {
            // Alerts a message that shows what comes from server side including in which conditions the device was rented so that the client can validate if it is being returned in the same conditions.
            showNotification("Success", res.msg);
            closeUser();
            closeCalcModal();
            // The rented list is updated to refresh the page
            updateRented();
            setTimeout(() => {
              window.location.href = "/devices";
            }, 4000); // delay the navigation for 3 seconds (adjust the delay time as needed)
          })
          // If there is an error establishing a connection, an alert is sent.
          .catch(function (e) {
            console.log(e.message);
            showNotification(
              "Error",
              "A connection to the server could not be established when trying to return a device. Please contact ICT Support."
            );
          });
      }
      // NOTE: known bug preserved from the original — the following resets and
      // updateRented() run even when window.confirm is cancelled; only the fetch
      // above is actually gated. Tracked separately in BACKLOG.md.
      closeUser();
      closeCalcModal();
      // The objects' keys are returned to their initial values.
      setUser({
        document: "",
        device: "",
        number: 0,
        name: "",
        section: "",
        date: "",
        time: "",
        email: "",
      });
      setActive({
        document: "",
        device: "",
        number: "",
        name: "",
        section: "",
        date: "",
        time: "",
        email: "",
      });
      // The rented list is updated just in case.
      updateRented();
    }
  }

  const [searchInfo, setSearchInfo] = useState<SearchInfo>({
    document: null,
    date: null,
    device: null,
    number: 0,
  });

  // The function handleSearch determines the values that are assigned inside the object searchInfo: Device and number. It is used when a device search is done or when entries/history is going to be downloaded.
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof SearchInfo;
    const value = event.target.value;
    setSearchInfo((searchInfo) => ({ ...searchInfo, [name]: value }));
  };

  // This function will send the searchInfo data to the server so that the desired information can be fetched and then downloaded.
  async function loadDataAndDownload(): Promise<void> {
    try {
      const response = await fetch(`${hostbase}/devices/entries`, {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ searchInfo }),
      });
      if (!response.ok) {
        throw new Error(`Failed to load data: ${response.status}`);
      }
      const result = await response.json();
      if (result.data.length === 0) {
        showNotification("Error", "No data found.");
        return;
      }
      // setHistory(result.data);
      showNotification(
        "Success",
        `Entries were loaded successfully. Please proceed to download them.`
      );
      downloadFile(result.data, "KC Report");
      setSearchInfo({
        document: null,
        date: null,
        device: null,
        number: 0,
      });
    } catch (error: any) {
      showNotification("Error", `Failed to load data: ${error.message}`);
    }
  }

  // When the information is fetched from server side and is loaded and ready to download, a button will be available to call the downloadFile() function, which will ask for confirmation after validation and create a table organizing all of the information that was previously fetched.
  const downloadFile = async function (
    arr: Record<string, any>[],
    fileName: string
  ): Promise<void> {
    if (arr.length === 0) {
      showNotification(
        "Error",
        "No available information to download. Please choose a filter and load the information."
      );
    } else {
      const confirmation = window.confirm(
        "Do you want to download the entries currently loaded?"
      );
      if (confirmation) {
        const header = Object.keys(arr[0]);
        const newArr = arr.map((entry) =>
          header.map((key) => {
            const value = entry[key];
            if (Array.isArray(value)) {
              return JSON.stringify(value);
            } else if (
              typeof value === "boolean" ||
              typeof value === "number"
            ) {
              return value;
            } else if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`;
            } else {
              return value || ""; // Replace empty values with a placeholder
            }
          })
        );

        const rows = newArr.map((entry) => entry.join(","));
        const csvContent = header.join(",") + "\r\n" + rows.join("\r\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", encodeURIComponent(fileName));
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object after the download starts
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);
      }
    }
  };

  return (
    <>
      <div
        className={`devices-section ${
          rentModalIsVisible || isUserVisible || calcModalIsVisible
            ? "dimmed-background"
            : ""
        }`}
      >
        <div className="device-navbar">
          <div>
            <h1>Devices</h1>
            <p>Users with rented devices</p>
          </div>
          <div className="device-navbar-tools">
            <label className="device-navbar-input">
              <input
                type="text"
                placeholder="Search here..."
                id=""
                name="document"
                value={searchInfo.document || ""}
                onChange={handleSearch}
              />
              <button
                className="search-button"
                onClick={loadDataAndDownload}
              ></button>
            </label>
            <select name="device" required>
              {/* <option>Filter by</option> */}
              <option>Document</option>
              {/* <option>Device number</option> */}
            </select>

            <button
              onClick={() => {
                setRentModalIsVisible(true);
                closeUser(); // Closes the user modal if it is open.
              }}
              className="button-container"
            >
              <div className="button-content">
                <img src={add} alt="" className="button-icon" />
                <span className="button-text">New rent</span>
              </div>
            </button>
          </div>
        </div>
        <Actives
          rented={rented}
          entries={entries}
          setActive={setActive}
          setIsUserVisible={setIsUserVisible}
          setCalcModalIsVisible={setCalcModalIsVisible}
          closeRentModal={closeRentModal}
          rentedCalcs={rentedCalcs}
          socket={socket}
        />
      </div>
      <div className={`user ${isUserVisible ? "visible" : ""}`}>
        <User
          active={active}
          closeUser={closeUser}
          returnDevice={returnDevice}
          showNotification={showNotification}
          returnCalc={returnCalc}
        />
      </div>
      <div className={`rent-modal ${rentModalIsVisible ? "visible" : ""}`}>
        <Rent
          updateRented={updateRented}
          entryCount={entryCount}
          showNotification={showNotification}
          admin={admin}
          closeRentModal={closeRentModal}
        />
      </div>
      <div className={`calc-modal ${calcModalIsVisible ? "visible" : ""}`}>
        <Calculators
          rentedCalcs={rentedCalcs}
          returnCalc={returnCalc}
          closeCalcModal={closeCalcModal}
        />
      </div>
    </>
  );
}
