import React, { useState, useEffect } from "react"

const DroneStatus = ({ DroneConnection }) => {

    const [connectionStatus, setConnectionstatus] = useState('Disconnected')

    const droneIP = '192.168.10.1'
    const commandPORT = 8889

    const droneControl = (droneCommand) => {
        DroneConnection.send(droneCommand, 0, droneCommand.length, commandPORT, droneIP, (error, bytes) => {
            if (error) throw error
            else {
                console.log('Command Sent: ' + droneCommand)
            }
        })
    }

    //Initial Connection
    useEffect(() => {
        // Initial Startup Command
        droneControl('command')

        // Initial Reception Check
        let receptionCheck = setTimeout(() => {
            setConnectionstatus('Disconnected')
            console.log('No Reception')
        }, 16000)

        DroneConnection.on('message', (msg, info) => {
            // Reception Listener
            if (msg !== null) {
                setConnectionstatus('Connected')
                console.log('Data Received From Drone : ' + msg.toString())

                // Subsequest Reception Check Timer
                clearTimeout(receptionCheck)
                console.log('Reception Status Updated')
                receptionCheck = setTimeout(() => {
                    setConnectionstatus('Disconnected')
                    console.log('No Reception')
                }, 30000)
            }

            else {
                console.log('Message Received Was Null')
            }
        })

        // Maintain Connection (Command sent & interval cleared every 15 seconds)
        const commandInterval = setInterval(() => {
            droneControl('command')
        }, 15000)

        return () => clearInterval(commandInterval)

    }, [])

    return (
        <div>
            <div>Drone Status: {connectionStatus}</div>
        </div>
    )
}

export default DroneStatus