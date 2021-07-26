import JobDetailContext from './JobDetailContext'
import Axios from 'axios'
import { useState, useEffect } from 'react'

const JobDetailProvider = ({ children }) => {

    let [activeJob, setActiveJob] = useState()
    let [flightPlan, setFlightPlan] = useState([])

    
    
    const updateActiveJob = (newJob) => {
        //update active job ONLY IF an internet connection is available.
        setActiveJob(newJob)
        async function fetchFlight () {
            let flightById = await Axios(`/api/work_orders/work_order/${newJob}`)
            setFlightPlan(flightById.data.flight.flight_plan)
            console.log(flightById.data.flight.flight_plan)
        }
        fetchFlight()
        
    } 
    
    const updateVideoFilename = async (filename) => {
   /*     let videoFilenameUpdate = await Axios({
            // method: 'PUT',
            method: 'PATCH',
            data: { videoURL: `http://rmrvbucket.s3.us-east-2.amazonaws.com/${filename}` },
            withCredentials: true,
            url: `http://localhost:3001/api/work_orders/work_order/${activeJob}`
        })
        console.log("function ran and posted video url")*/
    }    
    
    function clearJob () {
        setActiveJob(null)
        setFlightPlan([])
        console.log('clearJob called')

    } 

    let contextValue = {
        clearJob,
        updateActiveJob,
        activeJob,
        flightPlan,
        updateVideoFilename

    }

    return (
        <JobDetailContext.Provider value={contextValue}>
            { children }
        </JobDetailContext.Provider>
    )
}

export default JobDetailProvider