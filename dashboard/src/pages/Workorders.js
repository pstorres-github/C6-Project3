import React from 'react'
import ScheduleJobs from '../components/ScheduleJobs'
import AuthenticationContext from "../AuthenticationContext"
import { useContext } from "react"
import { useHistory } from "react-router-dom"


const Workorders = () => {

    const authContext = useContext(AuthenticationContext)
    const history = useHistory() 
   
    return (
    
        <div>
            <div className = "header">
                <h1> Welcome: {authContext.username}</h1>
                <p> Email:  {authContext.email} </p>
                <p> Account Type:  {authContext.accountType} </p>
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