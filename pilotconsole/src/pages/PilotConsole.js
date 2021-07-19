import './PilotConsole.css'

import ArtificialHorizon from '../components/ArtificialHorizon'
import AuthenticationContext from '../AuthenticationContext'
// Pilot Console Components
import DroneStatus from '../components/DroneStatus'
import FlightControls from '../components/FlightControls'
import FlightMap from '../components/FlightMap_Leaflet'
import Orientation from '../components/Orientation'
import Telemetry from '../components/Telemetry'
import VideoFeed from '../components/VideoFeed'

const PilotConsole = ({ DroneConnection, DroneState, DroneVideoFeed }) => {
    const authContext = useContext(AuthenticationContext)

    return (
        <div className="console-container">
            <div className="console-user-info">
                Welcome: {authContext.username}
            </div>

            <div className="console-horizon">
                <ArtificialHorizon />
            </div>

            <div className="console-telemetry">
                <Telemetry DroneState={DroneState} />
            </div>

            <div className="console-orientation">
                Drone 3D Orientation
                <Orientation />
            </div>

            <div className="console-flightplan">
                <FlightMap />
            </div>

            <div className="console-drone-status">
                <DroneStatus DroneConnection={DroneConnection} />
            </div>

            <div className="console-video-feed">
                <VideoFeed DroneVideoFeed={DroneVideoFeed} />
            </div>

            <div className="console-controls">
                <FlightControls DroneConnection={DroneConnection} />
            </div>

            <div className="console-flight-time">Drone Flight Time</div>
        </div>
    )
}

export default PilotConsole
