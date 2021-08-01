import './Defaults.css'
import './WorkOrdersByClient'

import * as Yup from 'yup'

import { Field, Form, Formik, useField } from 'formik'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import AuthenticationContext from '../AuthenticationContext'
// import './Scheduling.css'
import Checkbox from './Forms/Checkbox'
import FlightPlan from './FlightPlan.js'
import Select from './Forms/Select'
import TextArea from './Forms/TextArea'
import TextInput from './Forms/TextInput'
import axios from 'axios'
import { number } from 'yup/lib/locale'
import { useHistory } from 'react-router-dom'

function Scheduling(props) {
    const authContext = useContext(AuthenticationContext)

    const [waypoints, setWaypoints] = useState([])
    //const [pilots, setPilots] = useState([])
    const resetMapToggle = useRef(false)
    //newWaypoints is passed from child component(FlightPlan) up to parent
    function updateWaypoints(newWaypoints) {
        setWaypoints(newWaypoints)
        console.log('waypoints', waypoints)
    }

    /* moved ability to choose pilot to administrative page */
    // useEffect(() => {
    //     async function getPilots() {
    //         let { data } = await axios.get('/api/users?account_type=pilot')
    //         if (data) {
    //             console.log('userdata', data)
    //         }
    //         setPilots(data)
    //     }
    //     getPilots()
    // }, [])

    return (
        <div className="scheduling-container">
            <div className="scheduling-form-details">
                <Formik
                    initialValues={{
                        jobTitle: '',
                        jobNumber: '',
                        clientContact: '',
                        jobDetails: '',
                        pilotName: '',
                        pilotID: ''

                        // checkBox: true,
                        // startDate: new Date(),
                    }}
                    validationSchema={Yup.object({
                        // .email('Invalid email address.')
                        // .max(15, 'Must be fifteen characters or less.')
                        jobTitle: Yup.string()
                            .min(3, 'Must be at least three characters.')
                            .required('Required.'),
                        jobNumber: Yup.string()
                            .min(3, 'Must be at least three characters.')
                            .required('Required.'),
                        clientContact: Yup.string()
                            .min(10, 'Must be at least 10 characters.')
                            .required('Required.')
                        // acceptedTerms: Yup.boolean()
                        // .required('Required.')
                        // .oneOf(
                        //     [true],
                        //     'You must accept the terms and conditions.'
                        // ),
                        // specialPower: Yup.string()
                        //     .oneOf(
                        //         ['item1', 'item2', 'item3', 'other'],
                        //         'Invalid selection.'
                        //     )
                        //     .required('Required.'),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(async () => {
                            await axios
                                .post('/api/work_orders/create', {
                                    jobTitle: values.jobTitle,
                                    jobNumber: values.jobNumber,
                                    jobDetails: values.jobDetails,
                                    clientContact: values.clientContact,
                                    clientEmail: authContext.email,
                                    customerName: authContext.username,
                                    customerID: authContext.userID,
                                    flight_plan: waypoints,
                                    status: 'Pending'
                                    // move pilot assignment to administrator page
                                    //pilotName: values.pilot.username,
                                    //pilotID: values.pilot.id
                                })
                                .then((response) => {
                                    console.log(response)
                                })

                            console.log(`authContext: `, authContext)
                            props.newJobAdded()

                            console.log(`Form post values: `, values)
                            // reloadOrders(values)
                            resetForm()
                            resetMapToggle.current = true
                            setSubmitting(false)
                        }, 500)
                    }}
                >
                    {(props) => (
                        <Form>
                            <div className="form-job-name">
                                <TextInput
                                    label="Job name: &nbsp;"
                                    placeholder="Job name"
                                    name="jobTitle"
                                    type="text"
                                />
                            </div>
                            <div className="form-job-number">
                                <TextInput
                                    label="Job number: &nbsp;"
                                    placeholder="Job number"
                                    name="jobNumber"
                                    type="text"
                                />
                            </div>
                            <div className="form-client-number">
                                <TextInput
                                    label="Client contact number: &nbsp;"
                                    placeholder="Phone number"
                                    name="clientContact"
                                    type="text"
                                />
                            </div>
                            <div className="form-job-details">
                                <TextArea
                                    label="Job details: &nbsp;"
                                    placeholder="Job details"
                                    name="jobDetails"
                                    rows="4"
                                />
                            </div>
                            <div className="scheduling-map-container">
                                <div className="form-flight-plan">
                                    <FlightPlan
                                        updateWaypoints={updateWaypoints}
                                        initialValues={waypoints}
                                        mode="write"
                                        reset={resetMapToggle}
                                    />
                                </div>
                                {/* VDR hidden for demo day */}
                                {/* <div className="grey">datepicker placeholder</div>
                            <div className="grey">
                                start/end time requests range placeholder
                            </div> */}
                            </div>
                            {/*  Will move this logic (ability to choose pilot) to administrator page 
                        <div>
                            <Field as='select' name="pilot" onClick={(value)=>{console.log("value.value", Formik.values.pilot)}}>
                                {pilots.map((pilot) => (
                                    <option value={"ME"}>
                                        {pilot.username}
                                    </option>
                                ))}
                            </Field>
                        </div>*/}
                            {/* <div>
                            <Checkbox name="checkBox">
                                I checked this checkbox.
                            </Checkbox>
                        </div> */}
                            <div className="form-submit-section">
                                <button type="submit">
                                    {props.isSubmitting
                                        ? 'Submitting…'
                                        : 'Submit'}
                                </button>
                                {/* <button className="warn">Warn</button>
                            <button className="alert">Alert</button> */}
                                <button
                                    type="reset"
                                    className="cancel"
                                    onClick={() => {
                                        resetMapToggle.current = true
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Scheduling
