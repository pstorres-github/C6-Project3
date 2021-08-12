//import './WorkOrdersByClient.css'

import { NavLink, useHistory } from 'react-router-dom'
import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'

import AuthenticationContext from '../AuthenticationContext'
import TableContainer, { SelectColumnFilter } from './TableContainer.js'
import Axios from 'axios'
import AssignPilot from './AssignPilot.js'
import UpdateWorkOrderStatus from './UpdateWorkOrderStatus.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

const WorkOrdersAdmin = ({ selectedJob, handleTableUpdated }) => {
    // ADMINISTRATOR SHOULD BE ABLE TO:
    //    - assign pilot to work order
    //    - delete work order from database
    //    - ???

    const [pilotList, setPilotList] = useState('')

    useEffect(() => {
        async function getPilots() {
            let { data } = await Axios.get('/api/users?account_type=pilot')
            setPilotList(data)
        }
        getPilots()
    }, [])

    const [userFlights, setUserFlights] = useState([])
    const [pilots, setPilots] = useState([])
    const [childUpdated, setChildUpdated] = useState(false)

    const authContext = useContext(AuthenticationContext)

    const history = useHistory()

    /* access all flights */
    useEffect(() => {
        const fetchFlights = async () => {
            // console.log("UserName:", authContext.username);
            let flightsByUser = await fetch(`/api/work_orders/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let responseData = await flightsByUser.json()
            //   console.log("responseData:", responseData);
            setUserFlights(responseData.flights)
        }
        fetchFlights()
        // }, [authContext.username])
    }, [childUpdated])

    const handleChildUpdated = () => {
        setChildUpdated(childUpdated=>!childUpdated)
        handleTableUpdated()
        console.log('childUpdated')
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Pilot',
                accessor: 'pilot',
                Cell: ({ cell }) => {
                    const { value, row } = cell //row is destructured, can access the row content by row.original."accessor" name
                    return (
                        <>
                            {/* <em><FontAwesomeIcon icon={["far", "coffee"]} /> Pilot:</em> */}
                            <FontAwesomeIcon icon={['far', 'id-badge']} />
                            {value ? value : 'None Assigned'}
                            <div className="inline right smaller">
                                <AssignPilot
                                    pilotList={pilotList}
                                    workOrderID={row.original._id}
                                    handleChildUpdated={handleChildUpdated}
                                />
                            </div>
                        </>
                    )
                }
            },
            { Header: 'Flight Date', accessor: 'date' },
            { Header: 'Flight Time', accessor: 'time' },
            { Header: 'Client Contact', accessor: 'clientContact' },
            { Header: 'Client Email', accessor: 'clientEmail' },
            { Header: 'Job No', accessor: 'jobNumber' },
            {
                Header: 'Work Order',
                accessor: '_id',
                Cell: ({ cell }) => {
                    const { value } = cell
                    if (!value) return null
                    return (
                        <>
                            {value.slice(0, 8)}
                            <div className="inline right smaller">
                                <a href={`/workorders/${value}`} onClick={event=>event.stopPropagation}>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="icon"
                                    />
                                    Details
                                </a>
                            </div>
                            {/* This doesn't work VDR 👇🏻 */}
                            {/* <div className="inline right"><button className=" tiny-text" onclick={`/workorders/${value}`}>Edit</button></div> */}
                        </>
                    )
                }
            },
            { Header: 'Details', accessor: 'jobDetails'},
            {
                Header: 'Status',
                accessor: 'status',
                Filter: SelectColumnFilter,
                filter: 'equals',
                Cell: ({ cell, row }) => {
                    const { value } = cell
                    if (!value) return null
                    return (
                        <>
                            {value}
                            <div className="inline right smaller" onClick={event=>event.stopPropagation}>
                                <UpdateWorkOrderStatus
                                    workOrderID={row.original._id}
                                    handleChildUpdated={handleChildUpdated}
                                    
                                />
                            </div>
                        </>
                    )
                }
            }
        ],
        [childUpdated]
    )

    if (!pilots) return null

    if (userFlights.length === 0)
        return <p>There are no previous flights for this user</p>

    return (
        <div>
            <TableContainer
                columns={columns}
                data={userFlights}
                selectedJob={(job) => selectedJob(job)}
            />
        </div>
    )
}

export default WorkOrdersAdmin
