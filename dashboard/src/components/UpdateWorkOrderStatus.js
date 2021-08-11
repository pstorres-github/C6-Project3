import Axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './ConfirmModal_custom.css'; // Import custom css for the confirm modal


const UpdateWorkOrderStatus = ({ workOrderID, handleChildUpdated }) => {
    const [update, setUpdate] = useState(false)
    const [status, setStatus] = useState()

    const handleChange = (event) => {
        console.log('selected', event.target.value)
        setStatus(event.target.value)
        console.log('work order ID', workOrderID)
    }

    const handleSubmit = async () => {
        let statusUpdate
        
        /* DELETE STATUS */
        if (status === 'Delete') {

            //complete modal before continuing
            async function modalAlert () {
                confirmAlert({
                    closeOnClickOutside: false,

                    customUI: ({ onClose }) => {
                        return (
                        <div className='confirm-modal-container'>
                                <div className='confirm-modal-header'>
                                        <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                                        Confirm Deletion
                                </div>

                                <p>Deleting work order cannot be undone, and all data within the work order will be lost.</p>
        
                                <div className='confirm-modal-button-group'>
                                    <button onClick={onClose}>Cancel</button>
                                    <button
                                        onClick={async () => {
                                            await deleteWorkOrder();
                                            document.location.reload()
                                            onClose();
                                        }}
                                        >
                                        Delete
                                    </button>
                                </div>
                        </div>
                        );
                    }
                })
            }
            await modalAlert()

            // //pop-up modal to confirm deletion
            async function deleteWorkOrder () {
                console.log ("I am deleting")

                try {
                    statusUpdate = await Axios({
                        method: 'DELETE',
                        withCredentials: true,
                        url: `http://localhost:3001/api/work_orders/work_order/${workOrderID}/delete`
                    })
                    console.log(statusUpdate)
                           
                } catch (err) {
                    console.log('Error:', err)
                }
                handleChildUpdated() 
            }    
        } else {

            /* ALL OTHER STATUS UPDATES */
            try {
                statusUpdate = await Axios({
                    method: 'PATCH',
                    data: { status: status },
                    withCredentials: true,
                    url: `http://localhost:3001/api/work_orders/work_order/${workOrderID}`
                })
                console.log(statusUpdate)
            } catch (err) {
                console.log('Error:', err)
            }
            console.log('Updated status sent to database')
       }
    
        setUpdate(false)
        handleChildUpdated()
    }

    return (
        <div>
            {/* <div  className="tiny-text inline right" >
                { !update && <button onClick={()=>{setUpdate(true)}}>EDIT</button> } 
            </div> */}

            {!update && (
                <button
                    className="smaller"
                    onClick={() => {
                        setUpdate(true)
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} className="icon" />
                    Edit
                </button>
            )}

            {update && (
                <div>
                    <label htmlFor="status-assign">
                        {' '}
                        Update Status:
                        <select onChange={(event) => handleChange(event)}>
                            <option selected disabled>
                                --Select--
                            </option>
                            <option value={'Requested'}>Requested</option>
                            <option value={'Pending'}>Pending</option>
                            <option value={'Completed'}>Completed</option>
                            <option value={'Cancelled'}>Cancelled</option>
                            <option value={'Delete'}>Delete</option>
                        </select>
                    </label>
                    <br></br>
                    <button
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        {' '}
                        Submit{' '}
                    </button>
                    <button
                        onClick={() => {
                            setUpdate(false)
                        }}
                    >
                        {' '}
                        Cancel{' '}
                    </button>
                </div>
            )}
        </div>
    )
}
export default UpdateWorkOrderStatus
