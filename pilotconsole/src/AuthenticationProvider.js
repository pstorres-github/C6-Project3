import AuthenticationContext from './AuthenticationContext'
import Axios from 'axios'
import { useState, useEffect, useContext } from 'react'

const AuthenticationProvider = ({ children }) => {

    let [username, setUsername] = useState('Guest Pilot')
    let [email, setEmail] = useState()
    let [accountType, setAccountType] = useState()
    let [userID, setUserID] = useState()
    let [loading, setLoading] = useState(true)

    const reconnect = async () => {
        let { data } = await Axios.get('/login/loggedInUser')
        if (data) {
                setUsername(data.username)
                setEmail(data.email)
                setAccountType(data.account_type)
                setUserID(data._id)
        }
        console.log("reconnected", data)
        setLoading(false)
    }
    
    useEffect ( () => { 
        reconnect()
    }, [])


    const login = async (email, password) => {
        async function logintoServer() {
            const loggedInUser = await Axios({
                method: 'POST',
                data: { username: email, password: password },
                withCredentials: true,
                url: '/login'
            })

            if (loggedInUser.data) {
                //set the global authentication variables according to the user info returned from login process
                setUsername(loggedInUser.data.username)
                setEmail(loggedInUser.data.email)
                setAccountType(loggedInUser.data.account_type)
                setUserID(loggedInUser.data._id)
                return true
            } else {
                //log in failed
                return false
            }
        }
        
        const logInSuccess = await logintoServer()
        return logInSuccess
    }

    const logout = async () => {
        setUsername('Guest Pilot')
        setEmail(null)
        setAccountType(null)  
        setUserID(null)
        await Axios.get('/logout')
    }

    let contextValue = {
        username,
        email, 
        accountType,
        userID,
        login,
        logout,
    }

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {  loading ? <div> Loading...</div> : children }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider