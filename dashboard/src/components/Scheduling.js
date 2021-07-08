import './Defaults.css'

import * as Yup from 'yup'

import { Form, Formik, useField } from 'formik'

import AuthenticationContext from '../AuthenticationContext'
// import './Scheduling.css'
import Checkbox from './Forms/Checkbox'
import Select from './Forms/Select'
import TextArea from './Forms/TextArea'
import TextInput from './Forms/TextInput'
import axios from 'axios'
import { number } from 'yup/lib/locale'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

function ScheduleWorkorder() {
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    function reloadOrders(newOrder) {
        history.push('/workorders')
        console.log('We should be reloading.')
    }

    return (
        <div>
            <button type="button" onClick={reloadOrders}>
                Reload Orders
            </button>
            <Formik
                initialValues={{
                    jobTitle: '',
                    jobNumber: '',
                    clientContact: '',
                    jobDetails: ''
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
                    setTimeout(() => {
                        axios
                            .post('/api/work_orders/create', {
                                jobTitle: values.jobTitle,
                                jobNumber: values.jobNumber,
                                jobDetails: values.jobDetails,
                                clientContact: values.clientContact,
                                clientEmail: authContext.email,
                                customerName: authContext.username,
                                customerID: authContext.userID,
                                status: 'Pending'
                            })
                            .then((response) => {
                                console.log(response)
                            })

                        console.log(`authContext: `, authContext)

                        console.log(`Form post values: `, values)
                        reloadOrders(values)
                        resetForm()
                        setSubmitting(false)
                    }, 500)
                }}
            >
                {(props) => (
                    <Form className="">
                        <div>
                            <TextInput
                                label="Job name:"
                                placeholder="Job name"
                                name="jobTitle"
                                type="text"
                            />
                        </div>
                        <div>
                            {/* <div className="half-right"> */}
                            <TextInput
                                label="Job number:"
                                placeholder="Job number"
                                name="jobNumber"
                                type="text"
                            />
                        </div>
                        <div>
                            {/* <div className="half-right"> */}
                            <TextInput
                                label="Client contact number:"
                                placeholder="Phone number"
                                name="clientContact"
                                type="text"
                            />
                        </div>
                        <div>
                            <TextArea
                                label="Job details:"
                                placeholder="Job details"
                                name="jobDetails"
                                rows="4"
                            />
                        </div>
                        <div>
                            <div className="grey">
                                waypoints/map placeholder
                            </div>
                            <div className="grey">datepicker placeholder</div>
                            <div className="grey">
                                start/end time requests range placeholder
                            </div>
                        </div>
                        {/* <div>
                            <Select label="Dropdown List:" name="dropdownList">
                                <option value="">Select:</option>
                                <option value="item1">Item 1</option>
                                <option value="item2">Item 2</option>
                                <option value="item3">Item 3</option>
                                <option value="other">Other</option>
                            </Select>
                        </div> */}
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
                            <button type="reset" className="cancel">
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            Datepicker tbd.
        </div>
    )
}

export default ScheduleWorkorder
