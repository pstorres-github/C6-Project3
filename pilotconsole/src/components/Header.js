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
        <div>
            {authContext.accountType && (
                <button
                    onClick={() => {
                        logoutButton()
                    }}
                    className="btn btn-primary"
                >
                    Logout
                </button>
            )}
        </div>
    )
}

export default Header
