import './Defaults.css'

import * as Yup from 'yup'

import { Form, Formik, useField } from 'formik'

// import './Scheduling.css'
import Checkbox from './Forms/Checkbox'
import Select from './Forms/Select'
import TextArea from './Forms/TextArea'
import TextInput from './Forms/TextInput'

function FormDemo() {
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    checkBox: true,
                    dropdownList: '',
                    startDate: new Date(),
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(3, 'Must be at least three characters.')
                        .max(15, 'Must be fifteen characters or less.')
                        .required('Required.'),
                    email: Yup.string()
                        .email('Invalid email address.')
                        .required('Required.'),
                    acceptedTerms: Yup.boolean()
                        .required('Required.')
                        .oneOf(
                            [true],
                            'You must accept the terms and conditions.'
                        ),
                    specialPower: Yup.string()
                        .oneOf(
                            ['item1', 'item2', 'item3', 'other'],
                            'Invalid selection.'
                        )
                        .required('Required.'),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        resetForm()
                        setSubmitting(false)
                    }, 3000)
                }}
            >
                {(props) => (
                    <Form className="">
                        <div>
                            <TextInput
                                label="Job name:"
                                placeholder="Job name"
                                name="job-title"
                                type="text"
                            />
                        </div>
                        <div>
                            {/* <div className="half-right"> */}
                            <TextInput
                                label="Job number:"
                                placeholder="Job number"
                                name="job-number"
                                type="text"
                            />
                        </div>
                        <div>
                            <TextArea
                                label="Job details:"
                                placeholder="Job details"
                                name="job-details"
                                rows="4"
                            />
                        </div>
                        <div>
                            <Select label="Dropdown List:" name="dropdownList">
                                <option value="">Select:</option>
                                <option value="item1">Item 1</option>
                                <option value="item2">Item 2</option>
                                <option value="item3">Item 3</option>
                                <option value="other">Other</option>
                            </Select>
                        </div>
                        <div>
                            <Checkbox name="checkBox">
                                I checked this checkbox.
                            </Checkbox>
                        </div>
                        <div>
                            <button type="submit">
                                {props.isSubmitting ? 'Loading…' : 'Submit'}
                            </button>
                            <button className="warn">Warn</button>
                            <button className="alert">Alert</button>
                            <button className="cancel">Cancel</button>
                        </div>

                        <div></div>
                    </Form>
                )}
            </Formik>
            Datepicker tbd.
        </div>
    )
}

// function FormDemo() {
//     return (
//         <div>
//             <Formik
//                 initialValues={{
//                     name: '',
//                     email: '',
//                     acceptedTerms: true,
//                     specialPower: '',
//                 }}
//                 validationSchema={Yup.object({
//                     name: Yup.string()
//                         .min(3, 'Must be at least three characters.')
//                         .max(15, 'Must be fifteen characters or less.')
//                         .required('Required.'),
//                     email: Yup.string()
//                         .email('Invalid email address.')
//                         .required('Required.'),
//                     acceptedTerms: Yup.boolean()
//                         .required('Required.')
//                         .oneOf(
//                             [true],
//                             'You must accept the terms and conditions.'
//                         ),
//                     specialPower: Yup.string()
//                         .oneOf(
//                             ['item1', 'item2', 'item3', 'other'],
//                             'Invalid selection.'
//                         )
//                         .required('Required.'),
//                 })}
//                 onSubmit={(values, { setSubmitting, resetForm }) => {
//                     setTimeout(() => {
//                         alert(JSON.stringify(values, null, 2))
//                         resetForm()
//                         setSubmitting(false)
//                     }, 3000)
//                 }}
//             >
//                 {(props) => (
//                     <Form className="">
//                         {/* <div className="two-columns identify-2"> */}
//                         <div className="two-columns">
//                             {/* <div className="half-left"> */}
//                             <div>
//                                 <TextInput
//                                     label="Job name:"
//                                     placeholder="Job name"
//                                     name="job-title"
//                                     type="text"
//                                 />
//                             </div>
//                             <div>
//                                 {/* <div className="half-right"> */}
//                                 <TextInput
//                                     label="Job number:"
//                                     placeholder="Job number"
//                                     name="job-number"
//                                     type="text"
//                                 />
//                             </div>
//                         </div>
//                         <div className="two-columns">
//                             {/* <div className="full identify-2"> */}
//                             {/* <div className="full"> */}
//                             <div>
//                                 <TextArea
//                                     label="Job details:"
//                                     placeholder="Job details"
//                                     name="job-details"
//                                     rows="4"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <Select label="Dropdown List" name="dropdownList">
//                                 <option value="">Select:</option>
//                                 <option value="item1">Item 1</option>
//                                 <option value="item2">Item 2</option>
//                                 <option value="item3">Item 3</option>
//                                 <option value="other">Other</option>
//                             </Select>
//                         </div>
//                         <div>
//                             <Checkbox name="checkBox">Checkbox.</Checkbox>
//                         </div>
//                         <div>
//                             <button type="submit">
//                                 {props.isSubmitting ? 'Loading…' : 'Submit'}
//                             </button>
//                             <button className="warn">Warn</button>
//                             <button className="alert">Alert</button>
//                         </div>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     )
// }

export default FormDemo
