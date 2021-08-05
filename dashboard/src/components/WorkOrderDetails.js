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
            console.log('userFlight:', userFlight)

            let responseData = await flightById.json()
            // console.log("flightById:", flightById);
            //console.log("responseData:", responseData);
            setUserFlight(responseData.flight)
        }
        fetchFlight()
        // console.log('userFlight:', userFlight)
    }, [flightId])

    if (!userFlight) return null

    return (
            <div className="app-content-right">
        <div className="work-order-details">
                <div>Date: {userFlight.date} </div>
                <div>Pilot: {userFlight.pilot}</div>
                <div>Flight Time: {userFlight.time}</div>
                <div>
                    Flight Plan:
                    If completed, flight path is shown in red.
                    {' '}
                    <FlightPlan
                        mode="view"
                        initialValues={userFlight.flight_plan}
                        updateWaypoints={() => {}}
                        reset={resetMapToggle}
                        flightData={userFlight.flight_data}
                    />
                </div>
                {/*<div>Flight Data: {userFlight.flight_data}</div>*/}
                <div>Status: {userFlight.status}</div>
                <div>
                    <p>Video: Video will show here</p>
                    <video
                        src={userFlight.videoURL}
                        width={'720'}
                        height={'720'}
                        muted={'muted'}
                        autoPlay
                        controls
                    ></video>
                    {/* <div>Analytics: {userFlight.analytics.video} </div> */}
                </div>
            </div>

            <div className="workorder-map-label">
                <h3>Flight plan</h3>
            </div>
            <div className="workorder-map">
                <FlightPlan
                    mode="view"
                    initialValues={userFlight.flight_plan}
                    updateWaypoints={() => {}}
                    reset={resetMapToggle}
                />
            </div>

            <div className="workorder-nav">Return to work orders.&nbsp;<button onclick="history.back(-1)" className="">EXIT</button></div>
        </div>
    )
}

export default WorkOrderDetails
