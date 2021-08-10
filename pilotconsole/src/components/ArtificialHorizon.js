import './ArtificialHorizon.css'

import React, { useContext, useEffect } from 'react'

import TelemetryContext from '../TelemetryContext'
import { findAllByTestId } from '@testing-library/react'

const ArtificialHorizon = () => {
    const telemetryContext = useContext(TelemetryContext)

    const translate =
        90 + (1000 * telemetryContext.pitch + 90000) / 360 - 250 - 180 / 2
    const transformString = {
        transform: `rotate(${telemetryContext.roll}deg) translateY(${translate}%) scale(10)`
    }

    useEffect(() => {
        const AoB = document.getElementById('angle-of-bank-indicator')

        if (-60 <= telemetryContext.roll && telemetryContext.roll <= 60) {
            AoB.style.opacity = 1
            // console.log('visible')
        } else {
            AoB.style.opacity = 0
            // console.log('invisible')
        }
    }, [telemetryContext])

    const bankRotation = {
        transform: `rotate(${telemetryContext.roll}deg)`
    }

    let altitude = telemetryContext.altitude
    let speed = Math.abs(telemetryContext.speedX)

    const hdgString = {
        transform: `translateY(80%) rotate(${-telemetryContext.yaw}deg)`
    }

    return (
        <div className="horizon">
            <div className="alt-text">
                <div className="float-right inline plex">{altitude}</div>
            </div>
            <div className="air-text plex">{speed}</div>
            <div className="static-frame">
                <img
                    src="./assets/HUD_static-frame.svg"
                    alt="Artificial Horizon Base Frame"
                />
            </div>

            <div className="pitch-indicator" style={transformString}>
                <img
                    className="pitch-translate"
                    src="./assets/HUD_pitch-indicator.svg"
                    alt="pitch indicator svg"
                    width="100%"
                />
            </div>

            <div className="pitch-indicator-colour" style={transformString}>
                <img
                    className="pitch-translate"
                    src="./assets/HUD_pitch-indicator_colour.svg"
                    alt="pitch indicator svg"
                    width="100%"
                />
            </div>

            <div className="heading-indicator" style={hdgString}>
                <img
                    src="./assets/HUD_heading-indicator.svg"
                    alt="Heading Indicator"
                />
            </div>
            {/* <div className="pitch-indicator" style={pitchPosition}>
                <img
                    src="./assets/HUD_pitch-indicator.svg"
                    alt="Pitch Indicator"
                />
            </div> */}

            <div className="horizon-indicator">&nbsp;</div>

            <div
                className="angle-of-bank-indicator"
                id="angle-of-bank-indicator"
                style={bankRotation}
            >
                <div id="angle-of-bank-indicator-visibility">
                    <img
                        src="./assets/HUD_angle-of-bank-indicator.svg"
                        alt="Angle of Bank Indicator"
                    />
                </div>
            </div>
        </div>
    )
}

export default ArtificialHorizon
