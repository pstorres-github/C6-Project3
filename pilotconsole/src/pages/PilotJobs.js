import { useEffect, useState, useContext } from "react"
import Axios from "axios"
import AuthenticationContext from '../AuthenticationContext'
import JobDetailContext from '../JobDetailContext'
import "./PilotJobs.css"
import { useHistory } from "react-router-dom"

const PilotJobs = ({updateJobNumber}) => {

    const history = useHistory() 
    const authContext = useContext(AuthenticationContext)
    const jobContext = useContext(JobDetailContext)
    
    const [jobData, setJobData] = useState([])

    useEffect (()=>{
        console.log(authContext)
        const getAllPilotJobs = async () => {
            //let jobsForPilot = await Axios(`/api/work_orders/pilot/${authContext.userID}`)
            let jobsForPilot = await Axios(`/api/work_orders/pilot/${authContext.userID}`)
            
            let responseData = await jobsForPilot.data.flights;
            setJobData(responseData)
            console.log("jobData", responseData);
          
        };
          getAllPilotJobs();

    },[])

    return(

        <div className='pilot-jobs-table'>
        <h3>Select job to load into console:</h3>    
        <div className='table-pilot-job-header'>
            <div className='table-column-1'>Job Number</div>
            <div className='table-column-2'>Description</div> 
            <div className='table-column-3'>Client Name</div> 
            <div className='table-column-4'>Client Contact</div> 
            <div className='table-column-5'>Client E-mail</div> 
            <div className='table-column-6'>Status</div> 


        </div>

        {jobData.map(jobData => (
        <div key={jobData._id} onClick={()=>{jobContext.updateActiveJob(jobData._id) 
                                        history.push('/pilotconsole')}}>
            <div className='table-pilot-job-item'>
                <div className='table-column-1'>{jobData.jobNumber}</div>
                <div className='table-column-2'>{jobData.jobDetails}</div> 
                <div className='table-column-3'>{jobData.customerName}</div> 
                <div className='table-column-4'>{jobData.customerContact}</div> 
                <div className='table-column-5'>{jobData.clientEmail}</div> 
                <div className='table-column-6'>{jobData.status}</div> 
            </div>
        </div>   
        ))}
        </div>
    )
}

export default PilotJobs