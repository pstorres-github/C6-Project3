import "./ArtificialHorizon.css"

import React, { useContext } from "react"

import TelemetryContext from "../TelemetryContext"

// import "./assets/HUD_static-frame.svg"

const ArtificialHorizon = () => {

    // const telemetryContext = useContext(TelemetryContext)

    return (
        <div className="horizon">
            <div className="static-frame">
                <img src="./assets/HUD_static-frame.svg" alt="Artificial Horizon Base Frame" />
            </div>
           {/* <div className="heading-indicator">
                <img src="./assets/HUD_heading-indicator.svg" alt="Heading Indicator" />
            </div> */}
            {/* <div className="pitch-indicator">
                 <img src="./assets/HUD_pitch-indicator.svg" alt="Pitch Indicator" />
             </div> */}
            <div className="angle-of-bank-indicator">
                <img src="./assets/HUD_angle-of-bank-indicator.svg" alt="Angle of Bank Indicator" />
            </div>
            {/* <div className="altitiude-text">
                ALT
            </div>
            <div className="airspeed-text">
                AIR
            </div> */ }
        </div>
    )
}

export default ArtificialHorizon