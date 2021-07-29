import { useContext, useState } from 'react'

import AuthenticationContext from '../AuthenticationContext'
import React from 'react'
import WorkOrdersAdmin from '../components/WorkOrdersAdmin'

import { useHistory } from 'react-router-dom'

const Adminpage = () => {
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    return (
        <div className="customer-container">
            <div className="header">
                <div className="welcome-bar">
                    <p> Welcome: {authContext.username}</p>
                    <p> Email: {authContext.email} </p>
                    <p> Account Type: {authContext.accountType} </p>
                </div>
            </div>

            
            <div className="app-content-bottom">
                <div>
                    <h3>Work Order List</h3>
                    <WorkOrdersAdmin  />
                </div>
            </div>
        </div>
    )
}

export default Adminpage