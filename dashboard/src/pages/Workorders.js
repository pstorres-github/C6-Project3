import React from 'react'
import ScheduleJobs from '../components/ScheduleJobs'
import AuthenticationContext from "../AuthenticationContext"
import { useContext } from "react"

const Workorders = () => {

    const authContext = useContext(AuthenticationContext)
    //Note:  Authentication not completed yet.  Currently, the authentication context only contains default values and is not updated to current login.

    return (
    
        <div>
            <div className = "header">
                <h1>Welcome: {authContext.username}</h1>
            </div>

            <div>
                <h3>Work Order List</h3>
                <br/> <br/>
            
            </div>

            <div>
                <ScheduleJobs/>
            </div>



        </div>
    
    )

}

export default Workorders