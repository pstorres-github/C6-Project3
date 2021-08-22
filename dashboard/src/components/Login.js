// import "bootstrap/dist/css/bootstrap.css"
import './Login-Register.css'

import * as Yup from 'yup'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useContext, useState } from 'react'

import AuthenticationContext from '../AuthenticationContext'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const authContext = useContext(AuthenticationContext)

    const history = useHistory()
    const [loginError, setLoginError] = useState(false)

    return (
        <div className="container">
            <Formik
                initialValues={{ email: '', password: '' }}
                // validates against the validation schema defined as Yup Object

                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address format')
                        .required('E-mail is Required'),
                    password: Yup.string().required('Password is Required')
                })}
                onSubmit={async (values) => {
                    // on submission of form, set the values to be sent to login function
                    // if login fails, will ask user to try again
                    let loginStatus = await authContext.login(
                        values.email,
                        values.password
                    )
                    if (loginStatus === 'admin') {
                        history.push('/admin')
                    } else if (loginStatus === 'user') {
                        history.push('/workorders')
                    } else {
                        setLoginError(
                            'Invalid e-mail or password.  Please try again'
                        )
                    }
                }}
            >
                {/* touched object = true if field has been visited.  errors stores the all validation errros */}
                {({ errors, touched }) => (
                    <Form className="form-login-register">
                        <div className="form-group">
                            <div className="login-layout">
                                <div className="row-upper">
                                    <label htmlFor="e-mail">
                                        Email Address&nbsp;&nbsp;
                                    </label>
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

                                <div className="row-lower">
                                    <label htmlFor="password">
                                        Password&nbsp;&nbsp;
                                    </label>
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

                                <div className="row-bottom-right">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {' '}
                                        Submit{' '}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {loginError && (
                            <p className="login-error"> {loginError} </p>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login
