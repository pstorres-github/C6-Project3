import Axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

const AssignPilot = ({ pilotList, workOrderID, handleChildUpdated }) => {
    //if pilot is assigned, then update status as well to Pending
    const [update, setUpdate] = useState(false)
    const [pilot, setPilot] = useState()
    
    const handleChange = (event) => {
        console.log('selected', event.target.value)
        setPilot(event.target.value)
        console.log('work order ID', workOrderID)
    }

    const handleSubmit = async () => {
        let pilotUpdate
        try {
            pilotUpdate = await Axios({
                method: 'PATCH',
                data: { pilot: pilot,
                        status: "Pending" 
                        },
                withCredentials: true,
                url: `http://localhost:3001/api/work_orders/work_order/${workOrderID}`
            })
            console.log(pilotUpdate)
        } catch (err) {
            console.log('Error:', err)
        }
        console.log('new pilot sent to database')

        setUpdate(false)
        handleChildUpdated()
    }

    return (
        <div className="inline">
            {!update && (
                <button
                    className="smaller"
                    onClick={(event) => {
                        setUpdate(true)
                        event.stopPropagation()
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} className="icon" />
                    Edit
                </button>
            )}

            {update && (
                <div>
                    <label htmlFor="pilot-assign">
                        {' '}
                        Update pilot:
                        <select onChange={(event) => handleChange(event)} onClick={(event)=>event.stopPropagation()}>
                            <option selected disabled>
                                --Select--
                            </option>
                            {pilotList.map((pilot) => (
                                <option value={pilot.username}>
                                    {' '}
                                    {pilot.username}{' '}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br></br>
                    <button
                        onClick={(event) => {
                            event.stopPropagation()
                            handleSubmit()
                        }}
                    >
                        Submit
                    </button>
                    <button
                        onClick={(event) => {
                            event.stopPropagation()
                            setUpdate(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}

export default AssignPilot
