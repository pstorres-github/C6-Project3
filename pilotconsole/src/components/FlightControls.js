import './FlightControls.css'

import React, { useEffect, useState } from 'react'

import useKeyPress from '../hooks/useKeyPress'

const FlightControls = ({ DroneConnection }) => {
    const [controlSensitivity, setControlSensitivity] = useState(20) // Range 20-500 cm
    const [rotationSensitivity, setRotationSensitivity] = useState(5) // Range 1-3600 degrees
    const [speedSetting, setSpeedSetting] = useState(10) // Range 10-100 cm/s

    const droneIP = '192.168.10.1'
    const commandPORT = 8889

    const sendCommand = (droneCommand) => {
        DroneConnection.send(
            droneCommand,
            0,
            droneCommand.length,
            commandPORT,
            droneIP,
            (error, bytes) => {
                if (error) throw error
                else {
                    console.log('Command : ' + droneCommand)
                }
            }
        )
    }

    function ghost(button) {
        return new Promise((resolve) => {
            setTimeout(() => {
                document.getElementById(button).style.backgroundColor =
                    'var(--ghost)'
            }, 250)
        })
    }

    async function ghostHover(button) {
        document.getElementById(button).style.backgroundColor =
            'var(--button-clicked)'
        const result = await ghost(button)
    }

    const [keysIsChecked, setKeysIsChecked] = useState(false)

    const handleKeys = () => {
        setKeysIsChecked(!keysIsChecked)
    }

    // finding some directions in life
    // mostly up, down, left and right here
    // keypress events are tracked for keyboard
    // arrows, alongside WASD; Q and E rotation,
    // and T and L for takeoff and landing.
    // Spacebar is the emergency cut

    // if (keysIsChecked === true) {
    useKeyPress((e) => {
        if (
            document.activeElement === document.getElementById('notes') ||
            document.activeElement === document.getElementById('lat') ||
            document.activeElement === document.getElementById('long')
        ) {
            return
        } else {
            if (e.key === 'ArrowLeft' || e.key === 'a') {
                sendCommand('left ' + controlSensitivity)
                e.onkeydown = ghostHover('left-button')
                // e.onkeyup = ghost('left-button')
                e.preventDefault()
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                sendCommand('right ' + controlSensitivity)
                e.onkeydown = ghostHover('right-button')
                e.preventDefault()
            } else if (e.key === 'ArrowUp' || e.key === 'w') {
                sendCommand('forward ' + controlSensitivity)
                e.onkeydown = ghostHover('forward-button')
                e.preventDefault()
            } else if (e.key === 'ArrowDown' || e.key === 's') {
                sendCommand('back ' + controlSensitivity)
                e.onkeydown = ghostHover('back-button')
                e.preventDefault()
            } else if (e.key === 'q') {
                sendCommand('ccw ' + rotationSensitivity)
                e.onkeydown = ghostHover('ccw-button')
                e.preventDefault()
            } else if (e.key === 'e') {
                sendCommand('cw ' + rotationSensitivity)
                e.onkeydown = ghostHover('cw-button')
                e.preventDefault()
            } else if (e.code === 'BracketLeft') {
                sendCommand('down ' + controlSensitivity)
                e.onkeydown = ghostHover('down-button')
                e.preventDefault()
            } else if (e.code === 'BracketRight') {
                sendCommand('up ' + controlSensitivity)
                e.onkeydown = ghostHover('up-button')
                e.preventDefault()
            } else if (e.key === 't') {
                sendCommand('takeoff')
                e.onkeydown = ghostHover('takeoff-button')
                e.preventDefault()
            } else if (e.key === 'l') {
                sendCommand('land')
                e.onkeydown = ghostHover('land-button')
                e.preventDefault()
            } else if (e.code === 'Space') {
                sendCommand('emergency')
                e.preventDefault()
                console.log('emergency stop')
            }
        }
    })
    // } else {
    //     return
    // }

    useEffect(() => {
        // Initial Startup Command
        sendCommand('command')

        // Maintain Connection (Every 15 Seconds)
        const commandInterval = setInterval(() => {
            sendCommand('command')
        }, 15000)

        return () => clearInterval(commandInterval)
    }, [])

    return (
        <div className="controls-container">
            <div className="primary-controls">
                <div className="primary-controls-container">
                    <div className="takeoff-button">
                        <button
                            className="quiet 
                            center-flight-button smaller plex"
                            id="takeoff-button"
                            onClick={() => {
                                sendCommand('takeoff')
                                // console.log('foo')
                                ghostHover('takeoff-button')
                            }}
                        >
                            TAKEOFF
                        </button>
                    </div>
                    <div className="land-button">
                        <button
                            className="quiet center-flight-button  smaller plex"
                            id="land-button"
                            onClick={() => {
                                sendCommand('land')
                                ghostHover('land-button')
                            }}
                        >
                            LAND
                        </button>
                    </div>
                    <div className="upButton">
                        <button
                            className="flight-button smaller plex"
                            id="up-button"
                            onClick={() => {
                                sendCommand('up ' + controlSensitivity)
                                ghostHover('up-button')
                            }}
                        >
                            UP
                        </button>
                    </div>
                    <div className="downButton">
                        <button
                            className="flight-button smaller plex"
                            id="down-button"
                            onClick={() => {
                                sendCommand('down ' + controlSensitivity)
                                ghostHover('down-button')
                            }}
                        >
                            DOWN
                        </button>
                    </div>
                    <div className="leftButton">
                        <button
                            id="left-button"
                            className="flight-button plex"
                            onClick={() => {
                                sendCommand('left ' + controlSensitivity)
                                ghostHover('left-button')
                            }}
                        >
                            ←
                        </button>
                    </div>
                    <div className="rightButton">
                        <button
                            id="right-button"
                            className="flight-button plex"
                            onClick={() => {
                                sendCommand('right ' + controlSensitivity)
                                ghostHover('right-button')
                            }}
                        >
                            →
                        </button>
                    </div>
                    <div className="ccwButton">
                        <button
                            className="flight-button plex"
                            id="ccw-button"
                            onClick={() => {
                                sendCommand('ccw ' + rotationSensitivity)
                                ghostHover('ccw-button')
                            }}
                        >
                            ↻
                        </button>
                    </div>
                    <div className="cwButton">
                        <button
                            className="flight-button plex"
                            id="cw-button"
                            onClick={() => {
                                sendCommand('cw ' + rotationSensitivity)
                                ghostHover('cw-button')
                            }}
                        >
                            ↺
                        </button>
                    </div>
                    <div className="forwardButton">
                        <button
                            id="forward-button"
                            className="flight-button  plex"
                            onClick={() => {
                                sendCommand('forward ' + controlSensitivity)
                                ghostHover('forward-button')
                            }}
                        >
                            ↑
                        </button>
                    </div>
                    <div className="backButton">
                        <button
                            id="back-button"
                            className="flight-button  plex"
                            onClick={() => {
                                sendCommand('back ' + controlSensitivity)
                                ghostHover('back-button')
                            }}
                        >
                            ↓
                        </button>
                    </div>
                </div>
            </div>
            <div className="secondary-controls">
                {/* refactoring from toggle to button for the time being */}
                {/* <div class="switch-container">
                    <div className="keyboard-input">
                        <input
                            type="checkbox"
                            id="keyboard-input"
                            name="keyboard-input"
                            value="Keyboard"
                            checked={keysIsChecked}
                            onChange={handleKeys}
                        />
                    </div>
                    <div className="keyboard-status quiet">
                        {keysIsChecked ? 'Keys ON' : 'Keys OFF'}
                    </div>
                </div> */}

                <div className="secondary-controls-container">
                    {/* <div className="emergencyButton border"> */}
                    <div className="emergency-box">
                        <div className="emergency-wrapper">
                            <button
                                className="emergency-button plex-bold"
                                id="emergency-button"
                                onClick={() => {
                                    sendCommand('emergency')
                                    // emergencyHover('emergency-button')
                                }}
                            >
                                Emergency
                            </button>
                        </div>
                    </div>
                    <div className="speedButton">
                        <button
                            className="flight-button plex smaller"
                            id="speed-button"
                            onClick={() => {
                                sendCommand('speed ' + speedSetting)
                                ghostHover('speed-button')
                            }}
                        >
                            Speed
                            {/* Speed Hardcoded at 10 cm/s */}
                        </button>
                    </div>
                    <div className="streamOnButton">
                        <button
                            className="flight-button plex smaller"
                            id="stream-button"
                            onClick={() => {
                                sendCommand('streamon')
                                ghostHover('stream-button')
                            }}
                        >
                            Stream
                        </button>
                    </div>
                    <div className="keys-button">
                        <button
                            className="flight-button plex smaller"
                            id="keys-button"
                            onClick={() => {
                                handleKeys()
                                ghostHover('keys-button')
                            }}
                        >
                            Keys
                        </button>
                    </div>
                    {/* NOTE: set button to show state -VDR */}
                    {/* <div className="streamOffButton ">
                        <button
                            className="flight-button smaller"
                            onClick={() => sendCommand('streamoff')}
                        >
                            Stream Off
                        </button>
                    </div> */}
                    {/* <div className="batteryStatus ">
                        <button
                            className="center-flight-button plex smaller"
                            id="battery-button"
                            onClick={() => {
                                sendCommand('battery?')
                                ghostHover('battery-button')
                            }}
                        >
                            BATT
                        </button>
                    </div> */}
                    {/* <div className="battery-display">⌧</div> */}
                </div>
            </div>
        </div>
    )
}

export default FlightControls
