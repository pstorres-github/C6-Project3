import { useContext } from "react"
import "./PilotConsole.css"
import AuthenticationContext from "../AuthenticationContext"

// Pilot Console Components
import DroneStatus from '../components/DroneStatus'
import FlightControls from '../components/FlightControls'
import VideoFeed from '../components/VideoFeed'

const PilotConsole = ({ DroneConnection, DroneVideoFeed }) => {

    const authContext = useContext(AuthenticationContext)

    return (
        <div className="console-container">

            <div className="console-user-info" >
                Welcome: {authContext.username}
            </div>

            <div className="console-horizon" >
                Artificial Horizon
            </div>

            <div className="console-telemetry" >
                Telemetry
            </div>

            <div className="console-orientation" >
                Drone Orientation
            </div>

            <div className="console-flightplan" >
                Drone Flight Plan
            </div>

            <div className="console-drone-status" >
                <DroneStatus DroneConnection={DroneConnection} />
            </div>

            <div className="console-video-feed" >
                <VideoFeed DroneVideoFeed={DroneVideoFeed} />
            </div>

            <div className="console-controls" >
                <FlightControls DroneConnection={DroneConnection} />
            </div>

            <div className="console-flight-time" >
                Drone Flight Time
            </div>

        </div>

    )

}

export default PilotConsole