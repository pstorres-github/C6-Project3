import './Defaults.css'

import AuthenticationContext from '../AuthenticationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
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
        <div>
            <div className="inline">
                {authContext.accountType && (
                    <button
                        onClick={() => {
                            logoutButton()
                        }}
                        className="small-button"
                    >
                        <FontAwesomeIcon icon={faUserCircle} /> Logout{' '}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header
