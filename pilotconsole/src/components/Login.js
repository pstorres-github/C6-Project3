import { Formik, Field, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import "bootstrap/dist/css/bootstrap.css"
import "./Login.css"
import AuthenticationContext from "../AuthenticationContext"
import { useContext } from "react"

const Login = () => {

    const authContext = useContext(AuthenticationContext)


    return (
        
        <div class = "container">

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

                onSubmit = {(values)=> {
                    // on submission of form, set the values to be sent to login function
                    let authenticationInfo = {
                        email: values.email,
                        password: values.password
                    }
                    alert(`${values.email} and ${values.password} sent to database`)
                    authContext.logIn(authenticationInfo)
                }}
            >

                {/* touched object = true if field has been visited.  errors stores the all validation errros */}
                {({errors, touched}) => (
                <Form>
                    <div className = "form-group">
                       <div class="col-md">
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
                        <div class="col-md">
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

                </Form>
            )}
            </Formik>
                    
        </div>        
    )
}

export default Login
