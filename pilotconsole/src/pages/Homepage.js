import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import "./Homepage.css"

const Homepage = () => {

    const [viewMode, setViewMode] = useState('logIn')
    
    const history = useHistory()

    return (

        <div className="grid-container">

            <div className = "header">
            <h1>PILOT INTERFACE CONSOLE</h1>   
            </div>
    
            <div className = "section-nologin">
                <h3>Continue without logging in</h3>
                <button className="btn btn-primary" onClick={()=>{history.push('/pilotconsole')}}> Continue as a guest </button>  
            </div>    

            <div className = "section-login">
            
                <h3>Login to your account</h3>
                
                {viewMode === 'logIn' && 
                    (<>
                     <Login/>

                     <br/>
                     <p>Not registered?</p>
                     <button className="btn btn-primary" onClick = {()=> {setViewMode('register')}}>Register here</button>
                     </>)}
                    
                {viewMode === 'register' && <Register/>}
            
            </div>
 
        </div>

    )
}

export default Homepage
