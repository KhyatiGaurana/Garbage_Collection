import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./App.css";
import DarkNavbar from "./navbar";
import Cards from "./Bins";

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [existingArray, setExistingArray] = useState([
    ["54", "0.8", "28.62143027", "77.07086835"],
    ["41", "0.3", "28.67100262", "77.16428134"],
    ["51", "0.4", "28.56364388", "77.20453970"],
    ["47", "0.5", "28.57910743", "77.26245755"],
    ["22", "0.4", "28.58464133", "77.22140687"],
    ["28", "0.7", "28.66691194", "77.10124391"],
    ["95", "0.2", "28.61647486", "77.01815857"],
    ["77", "0.1", "28.62281141", "77.03890561"],
    ["10", "0.2", "28.61695580", "76.98442358"],
    ["28", "0.1", "28.62990652", "77.08192293"],
    ["55", "0.4", "28.59339933", "77.02385968"],
    ["5", "0.3", "28.60547400", "77.02653046"],
    ["96", "0.2", "28.59884265", "77.05451127"],
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.thingspeak.com/channels/2500040/feeds/last.json?api_key=WSJVNVF11I2FDBUF"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        console.log(jsonData);

        const firstelement = jsonData.field1;
        const binlevel = firstelement.substring(0, firstelement.length - 3);
        const newData = [
          binlevel,
          jsonData.field2,
          jsonData.field3,
          jsonData.field4,
        ];
        setApiData(newData);
        setExistingArray((prevArray) => {
          const newArray = [...prevArray];
          newArray[0] = newData;
          return newArray;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <DarkNavbar />
      <Cards data={existingArray} />
    </>
  );
};

export default App;
