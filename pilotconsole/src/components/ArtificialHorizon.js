import './ArtificialHorizon.css'

import React, { useContext } from 'react'

import TelemetryContext from '../TelemetryContext'

// import "./assets/HUD_static-frame.svg"

const ArtificialHorizon = () => {
    const telemetryContext = useContext(TelemetryContext)

    // telemetryContext transform function goes here
    // degrees * something to pixel values
    // return transformed telemetry

    let multiplier = 19.14;

    const pitchOffset = 2160 + (telemetryContext.pitch * multiplier);
    const pitchPosition = {
        // backgroundPosition: 'calc(100%) calc(100% - 1600px)'
        // backgroundPosition: 'calc(100%) 1620px' // this is muhammad's default window size
        backgroundPosition: `50%  ${pitchOffset}px` // muhammad full screen
    }

    const bankRotation = {
        transform: `rotate(${telemetryContext.roll}deg)`
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
            {/* <div className="pitch-indicator" style={pitchPosition}>
                <img
                    src="./assets/HUD_pitch-indicator.svg"
                    alt="Pitch Indicator"
                />
            </div> */}
            <div className="pitch-indicator" style={pitchPosition}>
                {/* spacer */}
            </div>

            <div className="angle-of-bank-indicator" style={bankRotation}>
                <img
                    src="./assets/HUD_angle-of-bank-indicator.svg"
                    alt="Angle of Bank Indicator"
                />
            </div>
        </div>
    )
}

export default ArtificialHorizon
