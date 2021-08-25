import * as Yup from 'yup'

import { ErrorMessage, Field, Form, Formik } from 'formik'

import AuthenticationContext from '../AuthenticationContext'
import Axios from 'axios'
import { useContext, useState } from 'react'
// import "bootstrap/dist/css/bootstrap.css"
import { useHistory } from 'react-router-dom'

const Register = ({setViewMode}) => {
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    const [registerError, setRegisterError] = useState(true)

    return (
        <div className="">
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                // validates against the validation schema defined as Yup Object
                validationSchema={Yup.object({
                    username: Yup.string().required('Username is Required'),
                    email: Yup.string()
                        .email('Invalid Email Address Format')
                        .required('E-mail is Required'),
                    password: Yup.string()
                        .min(5, 'Minimum 5 Characters')
                        .max(25, 'Maximum 25 Characters')
                        .required('Password is Required'),
                    confirmPassword: Yup.string()
                        .min(5, 'Minimum 5 Characters')
                        .max(25, 'Maximum 25 Characters')
                        .oneOf(
                            [Yup.ref('password'), null],
                            'Passwords Must Match'
                        )
                        .required('Password Confirmation is Required')
                })}
                onSubmit={async (values) => {
                    // on submission of form, set the values to create a new user
                    // assume always a pilot account type if registered on this platform
                    let authenticationInfo = {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        account_type: 'pilot'
                    }

                    try {
                        // Send registration data to database
                        await Axios({
                            method: 'POST',
                            data: authenticationInfo,
                            withCredentials: true,
                            url: '/register/'
                        }).then((registerInfo) => {
                            console.log(registerInfo.data)
                        })
                    } catch (error) {
                        setRegisterError(
                            'Problem Encountered Registering User.  Please Try Again Later.'
                        )
                    }

                    // Once registration is complete, continue to log user in
                    let registerStatus = await authContext.login(
                        values.email,
                        values.password
                    )

                    if (registerStatus === 'Network Unavailable') {
                        setRegisterError(
                            'Network Unavailable.  Please Try Again Later.'
                        )
                    } else if (registerStatus === true)
                        history.push('/pilotconsole')
                    else
                        setRegisterError(
                            'Problem Encountered Registering User.  Please Try Again Later.'
                        )
                }}
            >
                {/* touched object = true if field has been visited.  errors stores the all validation errros */}
                {({ errors, touched }) => (
                    <Form className="form-login-register">
                        <div className="login-layout">
                            <div className="row-one">
                                <div className="login-header">
                                    <h4>Register a New Account</h4>
                                </div>
                            </div>
                            <div className="row-two">
                                <label htmlFor="username">
                                    Pilot Name
                                </label>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter Pilot Name"
                                    className={`form-control ${
                                        touched.username && errors.username
                                            ? 'is-invalid'
                                            : ''
                                    }`}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="username"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="row-three">
                                <label htmlFor="e-mail">Email Address</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter e-mail"
                                    className={`form-control ${
                                        touched.email && errors.email
                                            ? 'is-invalid'
                                            : ''
                                    }`}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="email"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="row-four-left">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    className={`form-control ${
                                        touched.password && errors.password
                                            ? 'is-invalid'
                                            : ''
                                    }`}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="password"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="row-four-right">
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className={`form-control ${
                                        touched.confirmPassword &&
                                        errors.confirmPassword
                                            ? 'is-invalid'
                                            : ''
                                    }`}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="confirmPassword"
                                    className="invalid-feedback"
                                />
                            </div>

                            {registerError && (
                                <p className="error"> {registerError} </p>
                            )}

                            <div className="row-five text-right">
                                <button
                                    onClick={() => {
                                         setViewMode('logIn')
                                     }}
                                    className="cancel inline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Register and Login
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register
