import { NavLink, useHistory } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

import AuthenticationContext from '../AuthenticationContext'

const WorkOrdersByClient = () => {
    const [userFlights, setUserFlights] = useState([])
    const authContext = useContext(AuthenticationContext)

    useEffect(() => {
        const fetchFlights = async () => {
            // console.log("UserName:", authContext.username);
            let flightsByUser = await fetch(
                `http://localhost:3000/api/work_orders/${authContext.username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            let responseData = await flightsByUser.json()
            //   console.log("responseData:", responseData);
            setUserFlights(responseData.flights)
        }
        fetchFlights()
    }, [authContext.username])

    console.log('userFlights:', userFlights)

    if (userFlights.length === 0) {
        return <p>There are no previous flights for this user</p>
    } else {
        return (
            <div className="main-div">
                <div className="flights-by-user-wrap-div">
                    {userFlights.map((flights) => {
                        return (
                            <div>
                                <div>Date: {flights.date}</div>
                                <div>Pilot: {flights.pilot}</div>
                                <div>Flight Time: {flights.time}</div>
                                <div>Flight Plan: {flights.flight_plan}</div>
                                <div>Flight Status: {flights.status}</div>
                                <div>Job Number: {flights.jobNumber}</div>
                                <div>Job Details: {flights.jobDetails}</div>
                                <div>
                                    Client Contact Number:{' '}
                                    {flights.clientContact}
                                </div>
                                <div>Client Email: {flights.clientEmail}</div>
                                <NavLink to={`/workorders/${flights.id}`}>
                                    Work Order Details
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default WorkOrdersByClient
