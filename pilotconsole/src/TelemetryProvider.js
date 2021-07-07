import { useState } from 'react'
import TelemetryContext from './TelemetryContext'

const TelemetryProvider = ({ children }) => {

    const [pitch, setPitch] = useState('3')
    const [yaw, setYaw] = useState('4')
    const [roll, setRoll] = useState('5')
    const [height, setHeight] = useState()
    
    
    let telemetryUpdate = (telemetryData) => {
        console.log(telemetryData)
        setPitch(telemetryData.pitch) // in degrees
        setYaw(telemetryData.yaw) // in degrees
        setRoll(telemetryData.roll) // in degrees
        setHeight(telemetryData.h) //height in cm

    }

    let contextValue = {
        telemetryUpdate,
        pitch, 
        yaw,
        roll,
        height
    }

    return (
        <TelemetryContext.Provider value={contextValue}>
            {children}
        </TelemetryContext.Provider>
    )
}

export default TelemetryProvider