// import RegistrationForm from './Forms/FormikTut'
import Scheduling from './Scheduling'
// import ResetButton from './Forms/ResetButton'
// import SubmitButton from './Forms/SubmitButton'
import { useState } from 'react'

function ScheduleJobs(props) {
    const [form, setForm] = useState(props)
    const [workTitle, setWorkTitle] = useState(props.title)
    const [workNumber, setWorkNumber] = useState(props.number)
    const [workDetails, setWorkDetails] = useState(props.details)
    const [workDate, setWorkDate] = useState(props.date)

    function submitClicked() {
        console.log('Scheduling a new work order')
        let newWorkOrder = {
            title: workTitle,
            number: workNumber,
            details: workDetails,
            date: workDate,
        }
        setForm(newWorkOrder)
        console.log('work order created:', newWorkOrder)
    }

    const onInputChange = (event, setFunction) => {
        console.log('Changing input to be ', event.target.value)
        setFunction(event.target.value)
    }

    return (
        <div>
            <h3>Schedule a Flight</h3>
            <Scheduling />
        </div>
    )
}

export default ScheduleJobs

//     <form>
//         <label>Job title:</label>
//         <input
//             type="text"
//             id="job-title"
//             placeholder="Job Title"
//             value={workTitle}
//             onChange={(event) => onInputChange(event, setWorkTitle)}
//         ></input>

//         {/* Possibly auto-assigned as a default and user can enter own details if required */}
//         <label>Job number:</label>
//         <input
//             type="text"
//             id="job-number"
//             placeholder="Job Number"
//             value={workNumber}
//             onChange={(event) => onInputChange(event, setWorkNumber)}
//         ></input>

//         <br />
//         <label>Job details:</label>
//         <textarea
//             type="text"
//             id="job-details"
//             placeholder="Job Details"
//             value={workDetails}
//             onChange={(event) => onInputChange(event, setWorkDetails)}
//         ></textarea>

//         <br />

//         {/* <label for="datemax">
//   Enter a date before 2019-01-01:
// </label> */}

//         <label>Job date:</label>
//         <input
//             type="date"
//             min="2021-01-01"
//             max="2030-01-01"
//             value={workDate}
//             onChange={(event) => onInputChange(event, setWorkDate)}
//         />
//     </form>
//     {/* <ResetButton field="textarea, input" /> */}

//     {/* <button
//         onClick={() => {
//             setForm([])
//         }}
//     >
//         Clear
//     </button>
//     {console.log('clear was clicked:', form)} */}
//     {/* <SubmitButton /> */}
//     <button onClick={submitClicked}>Submit</button>
