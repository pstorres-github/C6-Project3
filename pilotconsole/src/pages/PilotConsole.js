import { useContext } from "react"
import "./PilotConsole.css"
import AuthenticationContext from "../AuthenticationContext"

// Pilot Console Components
import DroneStatus from '../components/DroneStatus'
import FlightControls from '../components/FlightControls'
import VideoFeed from '../components/VideoFeed'
import Telemetry from '../components/Telemetry'
import Orientation from '../components/Orientation'
import ArtificialHorizon from '../components/ArtificialHorizon'
import FlightMap from '../components/FlightMap_Leaflet'

const PilotConsole = ({ DroneConnection, DroneState, DroneVideoFeed }) => {

    const authContext = useContext(AuthenticationContext)

    return (
        <div className="console-container">

            <div className="console-user-info" >
                Welcome: {authContext.username}
            </div>

            <div className="console-horizon" >
                <ArtificialHorizon />
            </div>

            <div className="console-telemetry" >
                <Telemetry DroneState={DroneState} />
            </div>

            <div className="console-orientation" >
                Drone 3D Orientation
                <Orientation />
            </div>

            <div className="console-flightplan" >
                <FlightMap />
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