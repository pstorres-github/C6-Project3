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
    const [formToggle, setFormToggle] = useState(false)

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

            <div>
                <button
                    className="big-button"
                    onClick={() => {
                        setFormToggle(!formToggle)
                    }}
                >
                    {formToggle ? <>➖ </> : <>➕ </>}
                    Schedule a new job{' '}
                </button>
            </div>

            {formToggle && (
                <div className="app-content-top">
                    <div>
                        <Scheduling newJobAdded={statusUpdated} />
                    </div>
                </div>
            )}

            <div className="app-content-bottom">
                <div>
                    <h3>Work Order List</h3>
                    <WorkOrdersByClient newOrder={jobStatusUpdated} />
                </div>
            </div>
        </div>
    )
}

export default Workorders
