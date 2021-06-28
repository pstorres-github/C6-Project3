import React, { useState, useEffect } from "react"

const DroneStatus = ({ DroneConnection }) => {

    const [connectionStatus, setConnectionstatus] = useState('Disconnected')

    const droneIP = '192.168.10.1'
    const commandPORT = 8889

    const droneStartup = (droneCommand) => {
        DroneConnection.send(droneCommand, 0, droneCommand.length, commandPORT, droneIP, (error, bytes) => {
            if (error) throw error
            else {
                console.log('Command : ' + droneCommand)
            }
        })
    }

    //Initial Connection
    useEffect(() => {
        droneStartup('command')

        DroneConnection.on('message', (msg, info) => {
            setConnectionstatus(msg.toString())
            console.log('Data Received From Drone : ' + msg.toString())
        })
    }, [])

    // Maintain Connection (Command sent & interval cleared every 15 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            droneStartup('command')
        }, 15000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>Drone Status: {connectionStatus} </div>
    )
}

export default DroneStatus