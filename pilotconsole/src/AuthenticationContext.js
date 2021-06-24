import React from 'react'

const AuthenticationContext = React.createContext({
    userID: '',
    userName: '',
    logIn: (email, password) => {},
    logOut: () => {}
})

export default AuthenticationContext