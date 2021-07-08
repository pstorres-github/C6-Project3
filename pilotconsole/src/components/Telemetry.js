import React, { useEffect, useContext } from "react"
import throttle from 'lodash.throttle'
import TelemetryContext from "../TelemetryContext"


const Telemetry = ({ DroneState }) => {

    const telemetryContext = useContext(TelemetryContext)
    
    useEffect(() => {
        DroneState.on('message', throttle((telemetryInformationStream) => {
            telemetryContext.telemetryUpdate(parseState(telemetryInformationStream.toString()))
        },  33, { 'trailing': true })) //30 FPS Refresh Rate
      }, []);

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