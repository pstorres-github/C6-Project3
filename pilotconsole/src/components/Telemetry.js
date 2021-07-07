import React, { useState, useEffect, useContext } from "react"
import throttle from 'lodash.throttle'
import TelemetryContext from "../TelemetryContext"


const Telemetry = ({ DroneState }) => {

<<<<<<< HEAD
    const telemetryContext = useContext(TelemetryContext)
//    const [telemetryStream, setTelemetryStream] = useState('')
    
    useEffect(() => {
        DroneState.on('message', throttle((telemetryInformationStream) => {
//            setTelemetryStream(`${JSON.stringify(parseState(telemetryInformationStream.toString()))}`)
            telemetryContext.telemetryUpdate(parseState(telemetryInformationStream.toString()))
        
        }, 1000, { 'trailing': true }))
      }, []);
=======
    const [telemetryStream, setTelemetryStream] = useState('')

    useEffect(() => {
        DroneState.on('message', throttle((telemetryInformationStream) => {
            setTelemetryStream(`${JSON.stringify(parseState(telemetryInformationStream.toString()))}`)
        }, 33, { 'trailing': true })) //30 FPS Refresh Rate
    }, []);
>>>>>>> 2cd060ffb6569c88e7a75a66fa4e6228462c8e88

    const parseState = (state) => {
        return state
            .split(';')
            .map(x => x.split(':'))
            .reduce((data, [key, value]) => {
                data[key] = value;
                return data;
            }, {});
    }

    return (
        <div>
            <div>
                <p> Pitch: {telemetryContext.pitch} </p>
                <p> Yaw: {telemetryContext.yaw} </p>
                <p> Roll: {telemetryContext.roll} </p>
                <p> Height: {telemetryContext.height} </p>
            </div>

        </div>
    )
}

export default Telemetry