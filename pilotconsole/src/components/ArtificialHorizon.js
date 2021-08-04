import './ArtificialHorizon.css'

import React, { useContext, useEffect } from 'react'

import TelemetryContext from '../TelemetryContext'
import { findAllByTestId } from '@testing-library/react'

const ArtificialHorizon = () => {
    const telemetryContext = useContext(TelemetryContext)

    let scale = 10.0
    let translate = (((telemetryContext.pitch - (-90))/180) * 100)
    console.log("Translate : ", translate)

    // let transformString = `scale(${scale}), translateY(${translate}%)`
    let transformString = `scale(10.0), translateY(50%)`

    const horizonPosition = { transform: `scale(${scale})`}
    const horizontranslate = {transform: `translateY(${translate}%)`}

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

    return (
        <div className="horizon">
            <div className="alt-text">
                <div className="float-right inline plex">{altitude}</div>
            </div>
            <div className="air-text plex">
                {speed}
            </div>
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

            <div className="pitch-indicator" style={horizonPosition}>
                <img className="pitch-translate" src="./assets/HUD_pitch-indicator.svg" alt="pitch indicator svg" width="100%"/>
            </div>

            <div className="horizon-indicator">
                &nbsp;
            </div>

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