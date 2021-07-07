import { useState } from 'react'
import TelemetryContext from './TelemetryContext'

const TelemetryProvider = ({ children }) => {

    const [pitch, setPitch] = useState()
    const [yaw, setYaw] = useState()
    const [roll, setRoll] = useState()
    const [height, setHeight] = useState()

    const [battery, setBattery] = useState()

    const [speedX, setSpeedX] = useState()
    const [speedY, setSpeedY] = useState()
    const [speedZ, setSpeedZ] = useState()

    const [accelerationX, setAccelerationX] = useState()
    const [accelerationY, setAccelerationY] = useState()
    const [accelerationZ, setAccelerationZ] = useState()

    const [timeOfFlightDistance, setTimeOfFlightDistance] = useState()
    
    const [lowTemp, setLowTemp] = useState()
    const [highTemp, setHighTemp] = useState()

    const [motorRunTime, setMotorRunTime] = useState()



    let telemetryUpdate = (telemetryData) => {
        console.log(telemetryData)
        setPitch(Number(telemetryData.pitch)) // in degrees
        setYaw(Number(telemetryData.yaw)) // in degrees
        setRoll(Number(telemetryData.roll)) // in degrees
        setHeight(Number(telemetryData.h)) //height in cm

        setBattery(Number(telemetryData.bat)) //battery level in %
        
        setSpeedX(Number(telemetryData.vgx)) //speed in cm/s
        setSpeedY(Number(telemetryData.vgy)) //speed in cm/s
        setSpeedZ(Number(telemetryData.vgz)) //speed in cm/s

        setAccelerationX(Number(telemetryData.agx)) //acceleration in cm/s2
        setAccelerationY(Number(telemetryData.agy)) //acceleration in cm/s2
        setAccelerationZ(Number(telemetryData.agz)) //acceleration in cm/s2

        setTimeOfFlightDistance(Number(telemetryData.tof)) //distance in cm

        setLowTemp(Number(telemetryData.templ)) // temperature in degC
        setHighTemp(Number(telemetryData.temph)) // temperature in degC

        setMotorRunTime (Number(telemetryData.time)) // time in seconds

    }

    let contextValue = {
        telemetryUpdate,
        pitch, 
        yaw,
        roll,
        height,
        battery,
        speedX,
        speedY,
        speedZ,
        accelerationX,
        accelerationY,
        accelerationZ,
        timeOfFlightDistance,
        lowTemp,
        highTemp,
        motorRunTime
        
    }

    return (
        <TelemetryContext.Provider value={contextValue}>
            {children}
        </TelemetryContext.Provider>
    )
}

export default TelemetryProvider