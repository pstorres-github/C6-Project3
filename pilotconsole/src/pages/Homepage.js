import './Homepage.css'

import React, { useContext, useState } from 'react'

import AuthenticationContext from '../AuthenticationContext'
import Login from '../components/Login'
import Register from '../components/Register'
import { useHistory } from 'react-router-dom'

const Homepage = () => {
    const authContext = useContext(AuthenticationContext)
    const [viewMode, setViewMode] = useState('logIn')

    //login as guest only.  Will have no access to work order information
    const loginAsGuest = async () => {
        // set the values to guest login
        let loginStatus = await authContext.login('guest@guest.com', 'guest')
        if (loginStatus === 'Login Successful') history.push('/pilotconsole')
    }

    const history = useHistory()

    return (
        <div className="grid-container">
            <div className="header"></div>
            <div className="section-hero">
                <h1>Team Silvereyes</h1>
                <h2>Pilot Console</h2>
            </div>
            <div className="section-info"> </div>
            <div className="section-login-guest">
                <h4> Welcome, Guest</h4>
                {/* <button className="btn btn-primary" onClick={() => { loginAsGuest() }}> Continue as a Guest </button> */}
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        history.push('/pilotconsole')
                    }}
                >
                    Continue
                </button>
            </div>
            <div className="section-login-registered ">
                <h4>Login to your account</h4>
                {viewMode === 'logIn' && (
                    <>
                        <Login />
                        <p>Not registered?</p>
                        <br />
                        <br /> <br />
                        <br />
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setViewMode('register')
                            }}
                        >
                            Register Here
                        </button>
                    </>
                )}

                {viewMode === 'register' && <Register />}
            </div>
        </div>
    )
}

export default Homepage
