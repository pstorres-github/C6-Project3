import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import JobDetailContext from "../JobDetailContext";
import "./FlightReport.css";
import VideoUploadForm from "./VideoUploadForm"

const FlightReport = ({ onSave, flight }) => {
  const jobContext = useContext(JobDetailContext);
  const history = useHistory();

  // const [inputs, setInputs] = useState([]);
  const [insertedFlightPlan, setInsertedFlightPlan] = useState(flight.flight_plan);
  const [insertedFlightData, setInsertedFlightData] = useState(flight.flight_data);
  const [insertedStatus, setInsertedStatus] = useState(flight.status);
  const [insertedJobTitle, setInsertedJobTitle] = useState(flight.jobTitle);
  const [insertedJobNumber, setInsertedJobNumber] = useState(flight.jobNumber);
  const [insertedJobDetails, setInsertedJobDetails] = useState(flight.jobDetails);
  const [insertedClientContact, setInsertedClientContact] = useState(flight.clientContact);
  const [insertedClientEmail, setInsertedClientEmail] = useState(flight.clientEmail);
  const [insertedCustomerName, setInsertedCustomerName] = useState(flight.customerName);

  let editedFlight
  const onSaveClicked = async () => {
    console.log("Create has been clicked!");
    editedFlight = {
      flight_plan: insertedFlightPlan,
      flight_data: insertedFlightData,
      status: insertedStatus,
      jobTitle: insertedJobTitle,
      jobNumber: insertedJobNumber,
      jobDetails:insertedJobDetails,
      clientContact: insertedClientContact,
      clientEmail: insertedClientEmail,
      customerName: insertedCustomerName,
    };
    console.log("Editing flight", editedFlight);
    await onSave(editedFlight);
  }
  const onInputChange = (event, setFunction) => {
    console.log("Changing input to be ", event.target.value);
    setFunction(event.target.value)
  };

  if (flight) {
    return (
      <div className="flight-form">
        <label htmlFor="customerName">Client</label>
        <input
          className="form-input"
          value={insertedCustomerName}
          type="text"
        />
        <label htmlFor="clientEmail">E-mail</label>
        <input className="form-input" value={insertedClientEmail} type="text" />
        <label htmlFor="clientContact">Customer Contact Number</label>
        <input
          className="form-input"
          value={insertedClientContact}
          type="text"
          onChange={(event) => onInputChange(event, setInsertedClientContact)}
        />
        <label htmlFor="jobTitle">Job Title</label>
        <input className="form-input" value={insertedJobTitle} type="text" onChange={(event) => onInputChange(event, setInsertedJobTitle)} />
        <label htmlFor="jobNumber">Job Number</label>
        <input className="form-input" value={insertedJobNumber} type="text" onChange={(event) => onInputChange(event, setInsertedJobNumber)} />
        <label htmlFor="jobDetails">Job Details</label>
        <textarea
          className="form-input"
          value={insertedJobDetails}
          type="text"
          onChange={(event) => onInputChange(event, setInsertedJobDetails)}
        />
        <label>Job Status</label>
        <select
          value={insertedStatus}
          className="form-input"
          onChange={(event) => onInputChange(event, setInsertedStatus)}
        >
          <option disabled> Select one option</option>
          <option value={"Pending"}>Pending</option>
          <option value={"Completed"}>Completed</option>
        </select>
        <label>Flight Plan</label>
        <div className="form-flight-plan">
        {insertedFlightPlan.map((i) => {
          return (
            <div className="individual-flight-plan">
              <label>Latitude</label>
              <input className="form-input" value={i.lat} type="text" onChange={(event) => onInputChange(event, setInsertedFlightPlan)}/>
              <label>Longitude</label>
              <input className="form-input" value={i.lng} type="text" onChange={(event) => onInputChange(event, setInsertedFlightPlan)} />
            </div>
          );
        })}
        {/* <input className="form-input" value={insertedFlightPlan[0].lat} type="text" /> */}
        </div>
        <label>Flight Data</label>
        <input className="form-input" value={insertedFlightData} type="text" onChange={(event) => onInputChange(event, setInsertedFlightData)}/>
        <div className="videoUpload">
          <VideoUploadForm />
        </div>
        <button className="form-input-btn" onClick={onSaveClicked}>
          Submit Report
        </button>
        <button
          onClick={() => {
            history.push("/pilotconsole");
          }}
        >
          Back to Pilot Console
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default FlightReport;
