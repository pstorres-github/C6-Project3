import "./PilotConsole.css"
import AuthenticationContext from "../AuthenticationContext"
import { useContext } from "react"

const PilotConsole = () => {

    const authContext = useContext(AuthenticationContext)


    return (
        <div className = "console-container">

            <div className = "console-user-info" >
                Welcome: {authContext.username}
            </div>

            <div className = "console-horizon" >
                Artificial Horizon
            </div>

            <div className = "console-telemetry" >
                Telemetry
            </div>

            <div className = "console-orientation" >
                Drone Orientation
            </div>

            <div className = "console-flightplan" >
                Drone Flight Plan
            </div>

            <div className = "console-drone-status" >
                Drone Status
            </div>

            <div className = "console-video-feed" >
                Drone Video Feed
            </div>

            <div className = "console-controls" >
                Drone Controls
            </div>

            <div className = "console-flight-time" >
                Drone Flight Time
            </div>

        </div>

    )

}

export default PilotConsole