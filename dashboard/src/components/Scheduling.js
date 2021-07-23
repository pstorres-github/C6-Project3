import './Defaults.css'
import './WorkOrdersByClient'

import * as Yup from 'yup'

import { Form, Formik, useField } from 'formik'
import { useCallback, useContext, useEffect, useState } from 'react'

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
    const [pilots, setPilots] = useState([])
    //newWaypoints is passed from child component(FlightPlan) up to parent
    function updateWaypoints(newWaypoints) {
        setWaypoints(newWaypoints)
        console.log('waypoints', waypoints)
    }

    useEffect(() => {
        async function getPilots() {
            let { data } = await axios.get('/api/users?account_type=pilot')
            if (data) {
                console.log('userdata', data)
            }
            setPilots(data)
        }
        getPilots()
    }, [])

    return (
        <div>
            <Formik
                initialValues={{
                    jobTitle: '',
                    jobNumber: '',
                    clientContact: '',
                    jobDetails: '',
                    pilot: ''
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
                                status: 'Pending',
                                pilot: values.pilot
                            })
                            .then((response) => {
                                console.log(response)
                            })

                        console.log(`authContext: `, authContext)
                        props.newJobAdded()

                        console.log(`Form post values: `, values)
                        // reloadOrders(values)
                        resetForm()
                        setWaypoints([])
                        setSubmitting(false)
                        console.log(waypoints)
                    }, 500)
                }}
            >
                {(props) => (
                    <Form>
                        <div>
                            <TextInput
                                label="Job name: &nbsp;"
                                placeholder="Job name"
                                name="jobTitle"
                                type="text"
                            />
                        </div>
                        <div>
                            {/* <div className="half-right"> */}
                            <TextInput
                                label="Job number: &nbsp;"
                                placeholder="Job number"
                                name="jobNumber"
                                type="text"
                            />
                        </div>
                        <div>
                            {/* <div className="half-right"> */}
                            <TextInput
                                label="Client contact number: &nbsp;"
                                placeholder="Phone number"
                                name="clientContact"
                                type="text"
                            />
                        </div>
                        <div>
                            <TextArea
                                label="Job details: &nbsp;"
                                placeholder="Job details"
                                name="jobDetails"
                                rows="4"
                            />
                        </div>
                        <div>
                            <div className="grey">
                                <FlightPlan
                                    updateWaypoints={updateWaypoints}
                                    initialValues={waypoints}
                                    mode="write"
                                />
                            </div>
                            {/* VDR hidden for demo day */}
                            {/* <div className="grey">datepicker placeholder</div>
                            <div className="grey">
                                start/end time requests range placeholder
                            </div> */}
                        </div>
                        <div>
                            <Select label="Choose a pilot:" name="pilot">
                                <option disabled selected value>
                                    {' '}
                                    ---select---
                                </option>
                                {pilots.map((pilot) => (
                                    <option value={pilot._id}>
                                        {pilot.username}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        {/* <div>
                            <Checkbox name="checkBox">
                                I checked this checkbox.
                            </Checkbox>
                        </div> */}
                        <div>
                            <button type="submit">
                                {props.isSubmitting ? 'Submitting…' : 'Submit'}
                            </button>
                            {/* <button className="warn">Warn</button>
                            <button className="alert">Alert</button> */}
                            <button
                                type="reset"
                                className="cancel"
                                onClick={() => {
                                    updateWaypoints([])
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Scheduling
