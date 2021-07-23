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
        <div className="customer-container">
            <div className="header">
                <div className="welcome-bar">
                    <p> Welcome: {authContext.username}</p>
                    <p> Email: {authContext.email} </p>
                    <p> Account Type: {authContext.accountType} </p>
                </div>
            </div>

            {/* VDR hidden for demo day */}
            {/* Not needed for now */}
            {/* <div>
                <DemoText />
            </div> */}

            <div className="app-content-left">
                <div>
                    <Scheduling newJobAdded={statusUpdated} />
                </div>
            </div>
            <div className="app-content-right">
                <div>
                    <h3>Work Order List</h3>
                    <WorkOrdersByClient newOrder={jobStatusUpdated} />
                </div>
            </div>
        </div>
    )
}

export default Workorders
