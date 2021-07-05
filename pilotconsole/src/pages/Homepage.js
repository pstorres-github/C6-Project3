import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import "./Homepage.css"
import AuthenticationContext from "../AuthenticationContext"

const Homepage = () => {

    const authContext = useContext(AuthenticationContext)
    const [viewMode, setViewMode] = useState("logIn")
    
    //login as guest only.  Will have no access to work order information
    const loginAsGuest = async () => {
            // set the values to guest login
            let loginStatus = await authContext.login("guest@guest.com", "guest")
            if (loginStatus === "Login Successful")
                history.push('/pilotconsole')
    }

    const history = useHistory()

    return (

        <div className="grid-container">

            <div className="header">
                <h1>PILOT INTERFACE CONSOLE</h1>
            </div>

            <div className="section-nologin">
                <h3>Continue without logging in</h3>
                <button className="btn btn-primary" onClick={() => { loginAsGuest() }}> Continue as a Guest </button>
            </div>

            <div className="section-login">

                <h3>Login to your account</h3>

                {viewMode === 'logIn' &&
                    (<>
                        <Login />

                        <br />
                        <p>Not registered?</p>
                        <button className="btn btn-primary" onClick={() => { setViewMode('register') }}>Register Here</button>
                    </>)}

                {viewMode === 'register' && <Register />}

            </div>

        </div>

    )
}

export default Homepage
