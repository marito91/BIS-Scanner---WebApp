import React, { useState, useEffect, useMemo } from "react";
import hostbase from "../../../hostbase.js";
import Spinner from "../../Spinner";

export default function TextBookCirculation({ showNotification }) {
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //  SECTION TO CHECK RENTED TEXBOOKS  // // // // // // // // //
  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // /
  const [rentedTextbooks, setRentedTexbooks] = useState([]);

  const checkRented = async () => {
    const response = await fetch(`${hostbase}/textbooks/rented`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    });
    if (!response.ok) {
      showNotification(
        "Error",
        "Rented Books data could not be fetched. Please contact ICT support."
      );
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  };

  // useEffect(() => {
  //   checkRented()
  //     .then((res) => {
  //       setRentedTexbooks(res.data);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // });

  // Memoize the result of the checkRented function
  const memoizedRentedTextbooks = useMemo(() => {
    return checkRented().then((res) => res.data);
    // eslint-disable-next-line
  }, []);

  // Use the memoized result
  useEffect(() => {
    memoizedRentedTextbooks
      .then((data) => {
        setRentedTexbooks(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [memoizedRentedTextbooks]);

  // First, all of the sections available in the school are declared inside an array called sections.
  const sections = [
    { value: "", text: "--Choose a grade or section--" },
    { value: "3A", text: "3A" },
    { value: "3B", text: "3B" },
    { value: "3C", text: "3C" },
    { value: "4A", text: "4A" },
    { value: "4B", text: "4B" },
    { value: "4C", text: "4C" },
    { value: "5A", text: "5A" },
    { value: "5B", text: "5B" },
    { value: "5C", text: "5C" },
    { value: "6A", text: "6A" },
    { value: "6B", text: "6B" },
    { value: "6C", text: "6C" },
    { value: "7A", text: "7A" },
    { value: "7B", text: "7B" },
    { value: "7C", text: "7C" },
    { value: "8A", text: "8A" },
    { value: "8B", text: "8B" },
    { value: "8C", text: "8C" },
    { value: "9A", text: "9A" },
    { value: "9B", text: "9B" },
    { value: "9C", text: "9C" },
    { value: "10A", text: "10A" },
    { value: "10B", text: "10B" },
    { value: "10C", text: "10C" },
    { value: "11A", text: "11A" },
    { value: "11B", text: "11B" },
    { value: "11C", text: "11C" },
    { value: "12A", text: "12A" },
    { value: "12B", text: "12B" },
    { value: "12C", text: "12C" },
    { value: "13A", text: "13A" },
    { value: "13B", text: "13B" },
    { value: "13C", text: "13C" },
    { value: "STAFF", text: "STAFF" },
  ];

  const [selectedGrade, setSelectedGrade] = useState("");

  // The following function handles which section will be displayed.
  const handleSection = (event) => {
    setSelectedGrade(event.target.value);
  };

  // The loading variable state is declared as a flag for the spinner component, which will show while data is fetching.
  const [loading, setLoading] = useState(true);

  // While the information is being fetched from the server, the Spinner will be active and as soon the length of the array is greater than 0, the Spinner will deactivate and the collection will be displayed.
  useEffect(() => {
    if (rentedTextbooks.length > 0) {
      setLoading(false);
    }
  }, [rentedTextbooks]);

  const tableToDisplay = rentedTextbooks.filter(
    (user) => user.grade === selectedGrade
  );

  const downloadFile = async function (arr, fileName) {
    if (arr.length === 0) {
      showNotification(
        "Error",
        "No available information to download. Please choose a filter and load the information."
      );
    } else {
      const confirmation = window.confirm(
        "Do you want to download the complete list of rented textbooks?"
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
      {loading ? (
        <Spinner
          message={"Loading rented text books. This may take some time."}
        />
      ) : (
        <>
          <select
            name=""
            id="section-handler"
            onChange={handleSection}
            style={{ margin: "40px 0" }}
          >
            {sections.map((number) => (
              <option key={number.value} value={number.value}>
                {number.text}
              </option>
            ))}
          </select>
          <table className="">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rented Books</th>
                <th>Date Rented</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {/* The table array with the selected grade is mapped so that the user can see all active rented books from the selected section. */}
              {tableToDisplay.map((user) => (
                <tr key={user.document}>
                  <td>
                    <span>Name</span>
                    {user.name + " " + user.lastName}
                  </td>
                  <td>
                    <span>Rented Books</span>
                    {user.textbooks.map((text) => (
                      <>
                        {text.title} # {text.sample} <br />
                      </>
                    ))}
                  </td>
                  <td>
                    <span>Date Rented</span>
                    {user.textbooks.map((text) => (
                      <>
                        {text.dateRented} <br />
                      </>
                    ))}
                  </td>
                  <td id="email">
                    <span>Email</span>
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="download">
            <button
              style={{ margin: "40px 0" }}
              onClick={() =>
                downloadFile(rentedTextbooks, "List of Rented TextBooks")
              }
            >
              Download collection
            </button>
            {/* <button
              onClick={() =>
                console.log("Data length: " + rentedTextbooks.length)
              }
            >
              Log Users
            </button> */}
          </div>
        </>
      )}
    </>
  );
}
