import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment"; 

const PilotInfo = () => {
  const [pilotData, setPilotData] = useState();

  const pilotName = useParams().pilot;
  console.log("pilotName:", pilotName);

  // let qtyOfFlights

  useEffect(() => {
    const fetchPilot = async () => {
      let pilotDetails = await fetch(`/api/work_orders/pilot/${pilotName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let responseData = await pilotDetails.json();
      console.log("responseData:", responseData);
      setPilotData(responseData.flights);
    };
    fetchPilot();
    
  }, []);


  let listOfFlights = [];
  let totalHoursOfFlight;

  if (pilotData) {
    console.log("pilotData:", pilotData)

    for (let data of pilotData) {
      listOfFlights.push(data.time)
    }

    console.log("listOfFlights:", listOfFlights);
  
    const sumOfFlightTime = listOfFlights
      .slice(1)
      .reduce((prev, cur) => moment.duration(cur).add(prev),
        moment.duration(listOfFlights[0]));

    totalHoursOfFlight =  moment.utc(sumOfFlightTime.asMilliseconds()).format("HH:mm:ss");


  }
console.log("totalHoursOfFlight:", totalHoursOfFlight)



  return (
    <div>
      <div>Pilot: {pilotName}</div>
      {pilotData && (
        <div>
          <div>Number of flights: {pilotData.length}</div>
          <div>Hours of flight: {totalHoursOfFlight} </div>
        </div>
      )}
      {!pilotData && <div>There are no previous flights for this pilot</div>}
    </div>
  );
};

export default PilotInfo;
