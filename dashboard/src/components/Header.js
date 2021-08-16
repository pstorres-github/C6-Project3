import './Defaults.css'

import AuthenticationContext from '../AuthenticationContext'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const authContext = useContext(AuthenticationContext)
    const history = useHistory()

    const logoutButton = () => {
        authContext.logout()
        history.push('/')
    }

    return (
        <div className="app-header-container">
            <div className="header-logo"></div>
            <div className="header-logout right">
                {authContext.accountType && (
                    <button
                        onClick={() => {
                            logoutButton()
                        }}
                        className="small-button cancel"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header
