import './DroneStatus.css'

import React, { useEffect, useState } from 'react'

const DroneStatus = ({ DroneConnection }) => {
    const [connectionStatus, setConnectionstatus] = useState('Disconnected')

    let [connectionIndicator, setConnectionIndicator] = useState('alert')

    let colours = {
        disconnected: 'red',
        alert: 'orange',
        connected: 'green'
    }

    let connectionStyle = {
        // backgroundColor: `${colours.alert}`
    }

    console.log(connectionStyle)

    switch (connectionStatus) {
        case 'Connected':
            // setConnectionIndicator('1')
            connectionStyle = { backgroundColor: `${colours.connected}` }
            console.log('VDR Connection indicator: connected.')
            break
        case 'Disconnected':
            // setConnectionIndicator('0')
            connectionStyle = { backgroundColor: `${colours.disconnected}` }
            console.log('VDR Connection indicator: disconnected.')
            break
        default:
            // setConnectionIndicator('x')
            connectionStyle = { backgroundColor: `${colours.alert}` }
            console.log('VDR Connection indicator failed to initalize.')
    }

    //Initial Connection
    useEffect(() => {
        // Initial Reception Check
        let receptionCheck = setTimeout(() => {
            setConnectionstatus('Disconnected')
            // setConnectionIndicator('init')
            console.log('No Reception')
        }, 16000)

        // Message Handling
        DroneConnection.on('message', (msg) => {
            // Reception Listener
            if (msg !== null) {
                setConnectionstatus('Connected')
                // setConnectionIndicator('connected')
                console.log('Response : ' + msg.toString()) // Response from Drone

                // Subsequest Reception Check Timer
                clearTimeout(receptionCheck) // Reception Status Updated
                receptionCheck = setTimeout(() => {
                    setConnectionstatus('Disconnected')
                    // setConnectionIndicator('disconnected')
                    // document.documentElement.style.setProperty(
                    //     '--status',
                    //     'background-color: #FF0000'
                    // )

                    console.log('No Reception')
                }, 30000)
            } else {
                console.log('Response : Null')
                setConnectionIndicator('null')
            }
        })
    }, [])

    return (
        <div>
            <div className="status-container">
                <div className="bullet" style={connectionStyle}></div>
                {connectionStatus}
            </div>
        </div>
    )
}

export default DroneStatus
