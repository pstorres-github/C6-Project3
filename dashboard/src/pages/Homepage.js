import './Homepage.css'

import React, { useState } from 'react'

import Login from '../components/Login'
import Register from '../components/Register'

const Homepage = () => {
    const [viewMode, setViewMode] = useState('logIn')

    return (
        <div className="grid-container">
            <div className="header"></div>

            <div className="section-hero">
                <h1>Team Silvereyes</h1>
                <h2>Customer dashboard</h2>
            </div>

            <div className="section-login">
                <h3>Login to your account</h3>

                {viewMode === 'logIn' && (
                    <>
                        <Login />

                        <br />
                        <p>Not registered?</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setViewMode('register')
                            }}
                        >
                            Register here
                        </button>
                    </>
                )}

                {viewMode === 'register' && <Register />}
            </div>
        </div>
    )
}

export default Homepage
