import { Formik, Field, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import "bootstrap/dist/css/bootstrap.css"
import "./Login-Register.css"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    return (
        
        <div className = "container">

            <Formik
                initialValues = {{ username: "", email: "", password:""}}
                // validates against the validation schema defined as Yup Object
                validationSchema = { Yup.object({
                    username: Yup.string()
                        .required('Username is Required'),
                    email: Yup.string()
                        .email('Invalid email address format')
                        .required('E-mail is Required'),
                    password: Yup.string()
                        .min(5, "Minimum 5 Characters")
                        .max(25, "Maximum 25 Characters")
                        .required('Password is Required'),
                    confirmPassword: Yup.string()
                        .min(5, "Minimum 5 Characters")
                        .max(25, "Maximum 25 Characters")
                        .oneOf([Yup.ref('password'), null], "Passwords Must Match")                    
                        .required('Password Confirmation is Required'),
                    })}
                onSubmit = {(values)=> {
                    // on submission of form, set the values to create a new user
                    // assume always a pilot account type if registered on this platform
                    //let authenticationInfo = {
                    //    username: values.username,
                    //    email: values.email,
                    //    password: values.password,
                    //    account_type: "pilot"
                    //}
                    alert(`${values.username}, ${values.email}, ${values.password} sent to database`)
                    // TODO:
                    // login(authenticationInfo)
                    // TEMPORARY UNTIL AUTHENTICATION IS COMPLETE
                    // NOTE:  AUTHENTICATION/RETRIEVING FROM DATABASE is IN PROGRESS.
                    history.push('/workorders')
                }}
            >

                {/* touched object = true if field has been visited.  errors stores the all validation errros */}
                {({errors, touched}) => (
                <Form className = "form-login-register">

                    <div className = "form-group">
                       <div className="col-md">
                            <label htmlFor="username">Customer/Company Name</label>
                            <Field  
                                type="text"
                                name ="username"
                                placeholder="Enter Pilot Name or Company Name"
                                className={`form-control ${touched.username && errors.username ? "is-invalid" :""}`}
                            />
                            <ErrorMessage
                                component="div"
                                name="username"
                                className="invalid-feedback"
                            />
                        </div>
                    </div>

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

                    <div className = "form-group">
                        <div className="col-md">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field  
                                type="password"
                                name ="confirmPassword"
                                placeholder="Confirm password"
                                className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" :""}`}
                                />
                            <ErrorMessage
                                component="div"
                                name="confirmPassword"
                                className="invalid-feedback"
                                />
                        </div>
                    </div>

                    <br/>
                    <button type ="submit" className="btn btn-primary"> Register and Login </button>

                </Form>
            )}
            </Formik>
                    
        </div>        
    )
}

export default Register