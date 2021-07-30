import Axios from 'axios'
import {useState, useEffect} from 'react'

const AssignPilot = ({pilotList, workOrderID, handleChildUpdated}) => {

    const [update, setUpdate]=useState(false)
    const [pilot, setPilot]=useState()
    // const [pilotList, setPilotList] = useState("")

    // useEffect(() => {
    //     async function getPilots() {
    //         let { data } = await Axios.get('/api/users?account_type=pilot')
    //         setPilotList(data)
    //     }
    //     getPilots()
    // }, [])
    
    const handleChange = (event) => {
        console.log('selected',event.target.value)
        setPilot(event.target.value)
        console.log("work order ID",workOrderID)
    }

    const handleSubmit = async () => {
        let pilotUpdate
        try {
            pilotUpdate = await Axios({
            method: 'PATCH',
            data: { pilot: pilot },
            withCredentials: true,
            url: `http://localhost:3001/api/work_orders/work_order/${workOrderID}`,
        
        })
        console.log(pilotUpdate)
        } catch (err) {
            console.log("Error:", err)
        }
        console.log("new pilot sent to database")
        
        setUpdate(false)
        handleChildUpdated()
    }

    return(
        <div>
    
        { !update && <button onClick={()=>{setUpdate(true)}}> Update pilot</button> } 
    
        { update &&

            <div>
            
            <label htmlFor="pilot-assign"> Update pilot:
                <select onChange={(event)=>handleChange(event)}>
                    <option selected disabled>--Select--</option>
                    {pilotList.map((pilot) => (
                        <option value={pilot.username}> {pilot.username} </option>
                    ))}  
                </select>
            </label>
            <button onClick={()=>{handleSubmit()}}> Submit </button>
            <button onClick={()=>{setUpdate(false)}}> Cancel </button>    
            
            </div>

        }

        </div>   
    )



}

export default AssignPilot
// return (
//     <div>
//         <Formik
//             initialValues={{
//                 selectedPilots:""
//             }}
//             onSubmit={(values, { setSubmitting, resetForm }) => {
//                 setTimeout(async () => {
// //                        await axios
// //                            .post('/api/work_orders/create', {
//                             //pilotName: values.pilot.username,
//                             //pilotID: values.pilot.id
// //                            })
// //                            .then((response) => {
// //                                console.log(response)
// //                            })
//                     console.log(values)
//                     resetForm()
//                     setSubmitting(false)
//                 }, 500)
//             }}
//         >
//             {(props) => (
//                 <Form>
//                     <div>

//                     {/*<Field as="select" name="selectedPilot">
//                           {pilotList.map((pilot) => (
//                                 <option value={pilot._id}>
//                                     {pilot.username}
//                                 </option>
//                           ))}   
//                     </Field>*/}


//                     <Field as="select" name="selectedPilot">
//                     {pilotList.map((pilot) => (
//                                 <option value={pilot._id} name={pilot._id}>
//                                     {pilot.username}
//                                 </option>
//                           ))}   


// </Field>

//                         <button type="submit">
//                             {props.isSubmitting ? 'Submitting…' : 'Submit'}
//                         </button>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//     </div>
// )