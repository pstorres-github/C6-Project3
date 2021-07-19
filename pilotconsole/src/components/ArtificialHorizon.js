import './ArtificialHorizon.css'

import React, { useContext } from 'react'

import TelemetryContext from '../TelemetryContext'

// import "./assets/HUD_static-frame.svg"

const ArtificialHorizon = () => {
    // const telemetryContext = useContext(TelemetryContext)

    const pitchPosition = {
        backgroundPosition: 'calc(100%) calc(100% - 1890px)'
    }

    return (
        <div className="horizon">
            <div className="alt-text plex">ALT</div>
            <div className="air-text plex">SPEED</div>
            <div className="static-frame">
                <img
                    src="./assets/HUD_static-frame.svg"
                    alt="Artificial Horizon Base Frame"
                />
            </div>
            {/* <div className="heading-indicator">
                <img
                    src="./assets/HUD_heading-indicator.svg"
                    alt="Heading Indicator"
                />
            </div> */}
            <div className="pitch-indicator" style={pitchPosition}>
                {/* spacer */}
            </div>
            <div className="angle-of-bank-indicator">
                <img
                    src="./assets/HUD_angle-of-bank-indicator.svg"
                    alt="Angle of Bank Indicator"
                />
            </div>
        </div>
    )
}

export default ArtificialHorizon
