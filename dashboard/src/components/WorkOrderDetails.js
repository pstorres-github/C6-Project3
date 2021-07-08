import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WorkOrderDetails = () => {
  const flightId = useParams().id;
  console.log("flightId:", flightId);

  const [userFlight, setUserFlight] = useState([]);

  useEffect( () => {
    const fetchFlight = async () => {
      let flightById = await fetch(
        `http://localhost:3000/api/work_orders/work_order/${flightId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let responseData = await flightById.json();
      // console.log("flightById:", flightById);
      // console.log("responseData:", responseData);
      setUserFlight(responseData.flight);
    };
    fetchFlight();
    // console.log("userFlight:", userFlight);
  }, [flightId]);

  return (
    <div className="work-order-details">
      <div>
        <div>Date: {userFlight.date} </div>
        <div>Pilot: {userFlight.pilot}</div>
        <div>Flight Time: {userFlight.time}</div>
        <div>Flight Plan: {userFlight.flight_plan}</div>
        <div>Flight Data: {userFlight.flight_data}</div>
        <div>Status: {userFlight.status}</div>
        <div><p>Video: Video will show here</p>
          <video src={""} width={"320"} height={"240"} muted={"muted"}></video> 
        {/* <div>Analytics: {userFlight.analytics.video} </div> */}
        </div>
      </div>
    </div>
  );
};

export default WorkOrderDetails;
