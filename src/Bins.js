import Card from "react-bootstrap/Card";
import "./cards.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// const data = [
//   ["54", "0.8", "28.62143027", "77.07086835"],
//   ["41", "0.3", "28.67100262", "77.16428134"],
//   ["51", "0.4", "28.56364388", "77.2045397"],
//   ["47", "0.5", "28.57910743", "77.26245755"],
//   ["87", "0.3", "28.62485833", "77.0708469"],
//   ["22", "0.4", "28.58464133", "77.22140687"],
//   ["28", "0.7", "28.66691194", "77.10124391"],
//   ["95", "0.2", "28.61647486", "77.01815857"],
//   ["77", "0.1", "28.62281141", "77.03890561"],
//   ["62", "0", "28.61848111", "7.04814897"],
//   ["10", "0.2", "28.6169558", "76.98442358"],
//   ["28", "0.1", "28.62990652", "77.08192293"],
//   ["55", "0.4", "28.59339933", "77.02385968"],
//   ["5", "0.3", "28.605474", "77.02653046"],
//   ["96", "0.2", "28.59884265", "77.05451127"],
// ];

// function getBinData() {
//   return fetch(
//     "https://api.thingspeak.com/apps/thinghttp/send_request?api_key=E0XAL5O3F0MVB80E"
//   )
//     .then((response) => response.json())
//     .then((responseJson) => {
//       console.log(responseJson);
//       return responseJson.id;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// fetch(
//   "https://api.thingspeak.com/channels/2500040/feeds.json?api_key=WSJVNVF11I2FDBUF"
// )
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json(); // Parse JSON response
//   })
//   .then((data) => {
//     binData = data;
//     console.log("API response:", binData); // Log data to the console
//   })
//   .catch((error) => {
//     console.error("Fetch error:", error);
//   });

function Cards({ data }) {
  return (
    <>
      <div className="body">
        {/* <getBinData /> */}
        {data.map((item, idx) => (
          <Card
            bg="primary"
            text="light"
            style={{ width: "22%", margin: "1rem" }}
          >
            <Card.Header>Bin {idx}</Card.Header>
            <Card.Body>
              <Card.Title>Bin Fill Percentage</Card.Title>
              <Card.Text>
                <div>
                  <CircularProgressbar
                    value={item[0]}
                    text={item[0] + "%"}
                    strokeWidth={7}
                    styles={{
                      path: { stroke: "#fff" },
                      trail: { stroke: "rgba(255,255,255,0.2)" },
                      text: { fill: "#fff" },
                      height: "5%",
                      width: "3%",
                    }}
                  />
                </div>
                <div>Air Quality: {item[1]}</div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Cards;
