import AuthenticationContext from "../AuthenticationContext"
import JobDetailContext from '../JobDetailContext'
import { useContext } from "react"
import { useHistory } from "react-router-dom"

const Header = () => {

    const authContext = useContext(AuthenticationContext)
    const jobContext = useContext(JobDetailContext)
    const history = useHistory() 

    return (
        <div>
            { !authContext.userID && <button onClick={()=>{history.push('/') }} className="btn btn-primary"> Sign-in </button> }
             <button onClick={()=>{history.push('/pilotConsole') }} className="btn btn-primary"> Pilot Console </button> 
            
            { authContext.userID && <button onClick={()=>{history.push('/pilotjobs')} } className="btn btn-primary"> Load/View Pilot Jobs </button> }
            { authContext.userID && <button onClick={()=>{authContext.logout(); jobContext.clearJob(); history.push('/')} } className="btn btn-primary"> Logout </button> }

        </div>
    )
 
}

export default Header
