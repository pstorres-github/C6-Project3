import Axios from 'axios'
import {useState} from 'react'

const UpdateWorkOrderStatus = ({workOrderID, handleChildUpdated}) => {
   
    const [update, setUpdate]=useState(false)
    const [status, setStatus]=useState()
    
    const handleChange = (event) => {
        console.log('selected',event.target.value)
        setStatus(event.target.value)
        console.log("work order ID",workOrderID)
    }
    
    const handleSubmit = async () => {
        let statusUpdate
        
        /* DELETE STATUS */
        if (status === "DELETE") {
            try {
                statusUpdate = await Axios({
                method: 'DELETE',
                withCredentials: true,
                url: `http://localhost:3001/api/work_orders/work_order/${workOrderID}/delete`,
            
            })
            console.log(statusUpdate)
            } catch (err) {
                console.log("Error:", err)
            }
            console.log("Updated status sent to database")
        /* ALL OTHER STATUS UPDATES */    
        } else {
            try {
                statusUpdate = await Axios({
                method: 'PATCH',
                data: { status: status },
                withCredentials: true,
                url: `http://localhost:3001/api/work_orders/work_order/${workOrderID}`,
            
            })
            console.log(statusUpdate)
            } catch (err) {
                console.log("Error:", err)
            }
            console.log("Updated status sent to database")
        }
        
        setUpdate(false)
        handleChildUpdated()
    }
    
    return(
        <div>
    
        { !update && <button onClick={()=>{setUpdate(true)}}> Update Status</button> } 
    
        { update &&
    
            <div>
            
            <label htmlFor="status-assign"> Update Status:
                <select onChange={(event)=>handleChange(event)}>
                    <option selected disabled>--Select--</option>
                    <option value={"REQUESTED"}>REQUESTED</option>
                    <option value={"PENDING"}>PENDING</option>
                    <option value={"COMPLETED"}>COMPLETED</option>
                    <option value={"CANCELLED"}>CANCELLED</option>
                    <option value={"DELETE"}>DELETE RECORD</option>
                </select>
            </label>
            <button onClick={()=>{handleSubmit()}}> Submit </button>
            <button onClick={()=>{setUpdate(false)}}> Cancel </button>    
            
            </div>
    
        }
    
        </div>   
    )
}
export default UpdateWorkOrderStatus

