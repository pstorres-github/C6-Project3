import './WorkOrderDetails.css'

import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import FlightPlan from './FlightPlan.js'

const WorkOrderDetails = () => {
    const flightId = useParams().id
    console.log('flightId:', flightId)

    const [userFlight, setUserFlight] = useState()
    const resetMapToggle = useRef(false) // required for flight plan component.  No reset required.

    useEffect(() => {
        const fetchFlight = async () => {
            let flightById = await fetch(
                `/api/work_orders/work_order/${flightId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            let responseData = await flightById.json()
            // console.log("flightById:", flightById);
            //console.log("responseData:", responseData);
            setUserFlight(responseData.flight)
        }
        fetchFlight()
        // console.log("userFlight:", userFlight);
    }, [flightId])

    if (!userFlight) return null

    return (
        <div className="workorder-container">
            <div className="workorder-header">
                <div className="workorder-header-inner-container">
                    <div className="workorder-header-primary">
                        {/* Pilot: {userFlight.pilot} */}
                    </div>
                    <div className="workorder-header-secondary">
                        {/* Date: {userFlight.date} */}
                    </div>
                    <div className="workorder-header-secondary">
                        {/* Flight Time: {userFlight.time} */}
                    </div>
                </div>
            </div>

            <div className="workorder-video">
                {/* <p>Video: Video will show here</p> */}
                <video
                    src={userFlight.videoURL}
                    width={'100%'}
                    height={'100%'}
                    muted={'muted'}
                    autoPlay
                    controls
                ></video>
                {/* <div>Analytics: {userFlight.analytics.video} </div> */}
            </div>

            <div className="workorder-details">
                <div className="workorder-details-inner-container">
                    <div className="details-date">
                        Date: {userFlight.date} /
                    </div>
                    <div className="details-location">add: location</div>
                    <div className="details-pilot">Pilot: {userFlight.pilot}</div>
                    <div className="details-flight">
                        Flight Time: {userFlight.time}
                    </div>
                    <div className="details-data">
                        Flight Data: {userFlight.flight_data}
                    </div>
                    <div className="details-status">{userFlight.status}</div>
                </div>
            </div>

            <div className="workorder-map">
                <FlightPlan
                    mode="view"
                    initialValues={userFlight.flight_plan}
                    updateWaypoints={() => {}}
                    reset={resetMapToggle}
                />
            </div>

            <div className="workorder-nav">BUTTON return to table</div>
        </div>
    )
}

export default WorkOrderDetails
