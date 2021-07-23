import AuthenticationContext from '../AuthenticationContext'
import JobDetailContext from '../JobDetailContext'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const authContext = useContext(AuthenticationContext)
    const jobContext = useContext(JobDetailContext)
    const history = useHistory()

    return (
        <div>
            {!authContext.userID && (
                <button
                    onClick={() => {
                        history.push('/')
                    }}
                    className="small-button"
                >
                    Sign-in
                </button>
            )}
            &nbsp;
            <button
                onClick={() => {
                    history.push('/pilotConsole')
                }}
                className="small-button"
            >
                Pilot Console
            </button>
            {authContext.userID && (
                <button
                    onClick={() => {
                        history.push('/pilotjobs')
                    }}
                    className="small-button"
                >
                    Load/View Pilot Jobs
                </button>
            )}
            {authContext.userID && (
                <button
                    onClick={() => {
                        authContext.logout()
                        jobContext.clearJob()
                        history.push('/')
                    }}
                    className="small-button"
                >
                    Logout
                </button>
            )}
        </div>
    )
}

export default Header
