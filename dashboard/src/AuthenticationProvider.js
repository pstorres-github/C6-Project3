import { useState } from 'react'
import AuthenticationContext from './AuthenticationContext'

const AuthenticationProvider = ({ children }) => {
    
    let [username, setUsername] = useState('Guest') //temporary as 'GUEST' until hooked to authentication
    let [email, setEmail] = useState()
    let [userID, setUserID] = useState()
    // FUTURE note:  For dashboard, need to consider administrator role as well

     const logIn = (email, password) => {
        async function logintoServer() {
            let loginOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            }
            let response = await fetch('/api/auth/login', loginOptions)
            let loggedInUser = await response.json()
            console.log('The call the auth returned: ', loggedInUser)
        
            setUsername(loggedInUser.username)
            setUserID(loggedInUser.userID)
            setEmail(loggedInUser.email)    
        
        }
        logintoServer()
    }

    const logOut = () => {
        setUsername(null)
        setUserID(null)
        setEmail(null)  
    
    }

    let contextValue = {
        username,
        email, 
        userID,
        logIn,
        logOut
    }

    return (
        <AuthenticationContext.Provider value={ contextValue }>
            { children }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider