import './WorkOrderDetails.css'

import React, { useEffect, useState, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import FlightPlan from './FlightPlan.js'

const WorkOrderDetails = () => {
    const flightId = useParams().id
    console.log('flightId:', flightId)

    const [userFlight, setUserFlight] = useState()
    const resetMapToggle = useRef(false)  // required for flight plan component.  No reset required.

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
        <div className="work-order-details">
            <div className="app-content-right">
                <div>Date: {userFlight.date} </div>
                <div>Pilot: {userFlight.pilot}</div>
                <div>Flight Time: {userFlight.time}</div>
                <div>
                    Flight Plan:{' '}
                    <FlightPlan
                        mode="view"
                        initialValues={userFlight.flight_plan}
                        updateWaypoints={() => {}}
                        reset={resetMapToggle}
                    />
                </div>
                <div>Flight Data: {userFlight.flight_data}</div>
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
        </div>
    )
}

export default WorkOrderDetails
