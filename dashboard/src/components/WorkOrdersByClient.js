import './WorkOrdersByClient.css'

import { NavLink, useHistory } from 'react-router-dom'
import React, { useContext, useEffect, useState, useMemo } from 'react'

import AuthenticationContext from '../AuthenticationContext'
import TableContainer, { SelectColumnFilter } from './TableContainer.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

const WorkOrdersByClient = ({ newOrder, selectedJob }) => {
    const [userFlights, setUserFlights] = useState([])
    const authContext = useContext(AuthenticationContext)

    const history = useHistory()

    useEffect(() => {
        const fetchFlights = async () => {
            // console.log("UserName:", authContext.username);
            let flightsByUser = await fetch(
                `/api/work_orders/${authContext.username}`,
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
        // }, [authContext.username])
    }, [newOrder])

    console.log('userFlights:', userFlights)

    const columns = useMemo(
        () => [
            { Header: 'Job Number', accessor: 'jobNumber'},
            {
                Header: 'Pilot',
                accessor: 'pilot',
                Cell: ({ cell }) => {
                    const { value } = cell
                    if (!value) return null
                    return (
                        <>
                            {value}
                            <a href={`/pilot/${value}`}> View Pilot Info </a>
                        </>
                    )
                }
            },
            { Header: 'Flight Date', accessor: 'date' },
            { Header: 'Flight Time', accessor: 'time' },
            { Header: 'Client Contact', accessor: 'clientContact' },
            { Header: 'Client Email', accessor: 'clientEmail' },
            {
                Header: 'Work Order Details',
                accessor: '_id',
                Cell: ({ cell }) => {
                    const { value } = cell
                    if (!value) return null
                    return (
                        <>
                            {value.slice(0, 8)}
                            <a href={`/workorders/${value}`}>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className="icon"
                                />
                                Edit
                            </a>
                        </>
                    )
                }
            },
            { Header: 'Details', accessor: 'jobDetails'},
            {
                Header: 'Status',
                accessor: 'status',
                Filter: SelectColumnFilter,
                filter: 'equals'
            }
        ],
        []
    )

    if (userFlights.length === 0)
        return <p>There are no previous flights for this user</p>

    return <TableContainer columns={columns} data={userFlights} selectedJob={(job)=>selectedJob(job)} />
}

export default WorkOrdersByClient
