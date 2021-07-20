import { Formik, Field, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import "bootstrap/dist/css/bootstrap.css"
import "./Login-Register.css"

import AuthenticationContext from "../AuthenticationContext"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"

const Login = () => {

    const authContext = useContext(AuthenticationContext)

    const history = useHistory() 
    const [loginError, setLoginError] = useState(false)

    return (
        
        <div className = "container">

            <Formik
                
                initialValues = {{ email: "", password: "" }}
                // validates against the validation schema defined as Yup Object
                
                validationSchema = { Yup.object({
                    email: Yup.string()
                        .email('Invalid email address format')
                        .required('E-mail is Required'),
                    password: Yup.string()
                        .required('Password is Required'),
                })}

                onSubmit = {async (values)=> {
                    // on submission of form, set the values to be sent to login function
                    // if login fails, will ask user to try again
                    let loginStatus = await authContext.login(values.email, values.password)
                    if (loginStatus)
                        history.push('/workorders')
                    else
                        setLoginError('Invalid e-mail or password.  Please try again')
                
                }}
            >

                {/* touched object = true if field has been visited.  errors stores the all validation errros */}
                {({errors, touched}) => (
                <Form className = "form-login-register">
                    <div className = "form-group">
                       <div className="col-md">
                            <label htmlFor="e-mail">Email Address</label>
                            <Field  
                                type="email"
                                name ="email"
                                placeholder="Enter e-mail"
                                className={`form-control ${touched.email && errors.email ? "is-invalid" :""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="email"
                                className="invalid-feedback"
                                />
                        </div>
                    </div>

                    <div className = "form-group">
                        <div className="col-md">
                            <label htmlFor="password">Password</label>
                            <Field  
                                type="password"
                                name ="password"
                                placeholder="Enter password"
                                className={`form-control ${touched.password && errors.password ? "is-invalid" :""}`}
                                />
                            <ErrorMessage
                                component="div"
                                name="password"
                                className="invalid-feedback"
                                />
                        </div>
                    </div>

                    <br/>
                    <button type ="submit" className="btn btn-primary"> Submit </button>

                    { loginError && <p className="login-error"> {loginError} </p>  }

                </Form>
            )}
            </Formik>
                    
        </div>        
    )
}

export default Login
