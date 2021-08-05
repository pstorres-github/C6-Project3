import AuthenticationContext from '../AuthenticationContext'
import React from 'react'
import WorkOrdersAdmin from '../components/WorkOrdersAdmin'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import accountTypeIcons from '../components/AccountTypeIcons'

const Adminpage = () => {
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    return (
        <div className="customer-container">
            {/* <div className="header"> */}
                <div className="welcome-bar">
                    <p>Welcome: {authContext.username}</p>
                </div>
                <div className="welcome-bar-secondary">
                    {/* <p>Email: {authContext.email} ({authContext.accountType})</p> */}
                    <p>Email: {authContext.email} {accountTypeIcons()}</p>
                </div>
            {/* </div> */}

            <div className="customer-workorder-preview">
                video preview
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