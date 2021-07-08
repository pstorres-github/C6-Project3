import AuthenticationContext from './AuthenticationContext'
import Axios from 'axios'
import { useState } from 'react'

const AuthenticationProvider = ({ children }) => {
    let [username, setUsername] = useState('Guest') //temporary as 'GUEST' until hooked to authentication
    let [email, setEmail] = useState()
    let [accountType, setAccountType] = useState()
    let [userID, setUserID] = useState()

    // FUTURE note:  For dashboard, need to consider administrator role as well

    const login = async (email, password) => {
        async function logintoServer() {
            const loggedInUser = await Axios({
                method: 'POST',
                data: { username: email, password: password },
                withCredentials: true,
                url: '/login'
            })

            console.log('Login result:', loggedInUser.data)

            if (loggedInUser.data.loginAttempt === 'Login Successful') {
                //set the global authentication variables according to the user info returned from login process
                setUsername(loggedInUser.data.username)
                setEmail(loggedInUser.data.email)
                setAccountType(loggedInUser.data.account_type)
                setUserID(loggedInUser.data.userID)
                return loggedInUser.data.loginAttempt
            } else {
                //log in failed
                return loggedInUser.data.loginAttempt
            }
        }

        const logInSuccess = await logintoServer()
        console.log(logInSuccess)
        return logInSuccess
    }

    const logout = () => {
        setUsername(null)
        setEmail(null)
        setAccountType(null)
        setUserID(null)
    }

    let contextValue = {
        username,
        email,
        accountType,
        userID,
        login,
        logout
    }

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
