//import './WorkOrdersByClient.css'

import { NavLink, useHistory } from 'react-router-dom'
import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'

import AuthenticationContext from '../AuthenticationContext'
import TableContainer, {SelectColumnFilter} from './TableContainer.js'
import Axios from 'axios'
import AssignPilot from './AssignPilot.js'
import UpdateWorkOrderStatus from './UpdateWorkOrderStatus.js'

const WorkOrdersAdmin = () => {

    // ADMINISTRATOR SHOULD BE ABLE TO:
    //    - assign pilot to work order 
    //    - delete work order from database
    //    - ???

    const [pilotList, setPilotList] = useState("")

    useEffect(() => {
        async function getPilots() {
            let { data } = await Axios.get('/api/users?account_type=pilot')
            setPilotList(data)
        }
        getPilots()
    }, [])


    const [userFlights, setUserFlights] = useState([])
    const [pilots, setPilots] = useState([])
    const [childUpdated,setChildUpdated] = useState(false)

    const authContext = useContext(AuthenticationContext)

    const history = useHistory()

    /* access all flights */
    useEffect(() => {
        const fetchFlights = async () => {
            // console.log("UserName:", authContext.username);
            let flightsByUser = await fetch(
                `/api/work_orders/`,
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
    }, [childUpdated])

    const handleChildUpdated = () => {
        setChildUpdated(!childUpdated)
        console.log("childUpdated")
    }




    const columns = useMemo (
        () => [
            {Header: "Job Number", accessor: "jobNumber", width:100},
            {Header: "Pilot", accessor: "pilot", width:300, Cell: ({cell})=> {
                const {value, row} = cell //row is destructured, can access the row content by row.original."accessor" name
                return (
                   <>   
                        <em> Current Pilot: </em> {value ? value : "None Assigned"} <br></br>
                        <AssignPilot pilotList = {pilotList} workOrderID={row.original._id} handleChildUpdated={handleChildUpdated}/>
                   </>
                )
                }
            },
            {Header: "Flight Date", accessor: "date"},
            {Header: "Flight Time", accessor: "time"},
            {Header: "Client Contact", accessor: "clientContact"},
            {Header: "Client Email", accessor: "clientEmail"},
            {Header: "Work Order Details", accessor: "_id", Cell: ({cell})=> {              
                const {value} = cell
                if (!value) return null
                return (
                    <>   
                        {value}<br/>
                        <a href={`/workorders/${value}`}> View Work Order Details </a>
                    </>
                )
                }
            },
            {Header: "Details", accessor: "jobdetails"},    
            {Header: "Status", accessor: "status", Filter: SelectColumnFilter, filter:'equals', width:50, Cell: ({cell, row}) => {
                const {value} = cell
                if (!value) return null
                return (
                    <>   
                        {value}<br/>
                        <UpdateWorkOrderStatus workOrderID={row.original._id} handleChildUpdated={handleChildUpdated}/>
                    </>
                )
                }



            }


        ],[handleChildUpdated]
    )


        if (!pilots)
            return null

        if (userFlights.length === 0) 
            return <p>There are no previous flights for this user</p>

        return (
            <div>
            
            <button onClick={()=>handleChildUpdated}>Refresh</button>
            <AssignPilot pilotList={pilots}/>

            <TableContainer columns={columns} data={userFlights}/>
            </div>
        )

}

export default WorkOrdersAdmin


