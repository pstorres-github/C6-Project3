import React, { useState, useEffect } from "react"

const DroneStatus = ({ DroneConnection }) => {

    const [connectionStatus, setConnectionstatus] = useState('Disconnected')

    //Initial Connection
    useEffect(() => {

        // Initial Reception Check
        let receptionCheck = setTimeout(() => {
            setConnectionstatus('Disconnected')
            console.log('No Reception')
        }, 16000)

        // Message Handling
        DroneConnection.on('message', (msg, info) => {
            // Reception Listener
            if (msg !== null) {
                setConnectionstatus('Connected')
                console.log('Response : ' + msg.toString()) // Response from Drone

                // Subsequest Reception Check Timer
                clearTimeout(receptionCheck) // Reception Status Updated
                receptionCheck = setTimeout(() => {
                    setConnectionstatus('Disconnected')
                    console.log('No Reception')
                }, 30000)
            }

            else {
                console.log('Response : Null')
            }
        })

    }, [])

    return (
        <div>
            <div>Drone Status: {connectionStatus}</div>
        </div>
    )
}

export default DroneStatus