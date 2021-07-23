import './ArtificialHorizon.css'

import React, { useContext, useEffect } from 'react'

import TelemetryContext from '../TelemetryContext'
import { findAllByTestId } from '@testing-library/react'

// import "./assets/HUD_static-frame.svg"

const ArtificialHorizon = () => {
    const telemetryContext = useContext(TelemetryContext)

    // telemetryContext transform function goes here
    // degrees * something to pixel values
    // return transformed telemetry

    // OLD multiplier
    // let multiplier = 19.14
    // const pitchOffset = 2160 + telemetryContext.pitch * multiplier

    // VDR I've recalibrated the pitch to match an 85º max-angle
    // and I've scaled the width of the pitch tape to better fit the
    // window, which has effected the pitchOffset
    let multiplier = 9.625
    const pitchOffset = -780 + telemetryContext.pitch * multiplier

    const pitchPosition = {
        // backgroundPosition: 'calc(100%) calc(100% - 1600px)'
        // backgroundPosition: 'calc(100%) 1620px' // this is muhammad's default window size
        backgroundPosition: `50%  ${pitchOffset}px` // muhammad full screen
    }
    const pitchPosition2 = {
        backgroundPosition: `50%  ${pitchOffset}px`, // muhammad full screen
        transform: `rotate(${telemetryContext.roll}deg)`
    }

    // -60 <= telemetryContext.roll && telemetryContext.roll <= 60

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

    let altitude = telemetryContext.altitude // uncorrected
    let speed = telemetryContext.speedX // uncorrected

    return (
        <div className="horizon">
            <div className="alt-text plex">
                <span className="tiny-text">alt&#8201;</span>
                {altitude}
            </div>
            <div className="air-text plex">
                {speed} <span className="tiny-text">&#8201;spd</span>
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
            {/* <div className="pitch-indicator" style={bankRotation && pitchPosition}> */}
            <div className="pitch-indicator" style={pitchPosition2}>
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
