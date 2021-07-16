import { useContext, useState } from 'react'

import AuthenticationContext from '../AuthenticationContext'
import DemoText from '../components/DemoText'
import React from 'react'
import Scheduling from '../components/Scheduling'
import WorkOrdersByClient from '../components/WorkOrdersByClient'
import { useHistory } from 'react-router-dom'

const Workorders = () => {
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()
    const [jobStatusUpdated, setJobStatusUpdated] = useState(false)

    function statusUpdated() {
        console.log('status pre:', jobStatusUpdated)
        setJobStatusUpdated(!jobStatusUpdated)
        // setJobStatusUpdated(true)
        console.log('status post:', jobStatusUpdated)
    }

    return (
        <div>
            <div className="header">
                <h1> Welcome: {authContext.username}</h1>
                <p> Email: {authContext.email} </p>
                <p> Account Type: {authContext.accountType} </p>
            </div>

            <div>
                <DemoText />
            </div>

            <div>
                <Scheduling newJobAdded={statusUpdated} />
            </div>

            <div>
                <h3>Work Order List</h3>
                <WorkOrdersByClient newOrder={jobStatusUpdated} />
            </div>
        </div>
    )
}

export default Workorders
