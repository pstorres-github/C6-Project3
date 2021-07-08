import React, { useEffect, useContext } from "react"
import throttle from 'lodash.throttle'
import TelemetryContext from "../TelemetryContext"


const Telemetry = ({ DroneState }) => {

    const telemetryContext = useContext(TelemetryContext)

    useEffect(() => {
        DroneState.on('message', throttle((telemetryInformationStream) => {
            telemetryContext.telemetryUpdate(parseState(telemetryInformationStream.toString()))
        }, 33, { 'trailing': true })) //30 FPS Refresh Rate
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
                <p> Telemetry:</p>
                <p> Pitch: {telemetryContext.pitch}&deg;</p>
                <p> Yaw: {telemetryContext.yaw}&deg;</p>
                <p> Roll: {telemetryContext.roll}&deg;</p>
                <p> Altitude: {telemetryContext.altitude} cm</p>
                <p> ToF Sensor Distance: {telemetryContext.timeOfFlightDistance} cm</p>
                <p> Battery: {telemetryContext.battery}%</p>
                <p> Speed X: {telemetryContext.speedX} cm/s</p>
                <p> Speed Y: {telemetryContext.speedY} cm/s</p>
                <p> Speed Z: {telemetryContext.speedZ} cm/s</p>
                <p> Acceleration X: {telemetryContext.accelerationX} cm/s&sup2;</p>
                <p> Acceleration Y: {telemetryContext.accelerationY} cm/s&sup2;</p>
                <p> Acceleration Z: {telemetryContext.accelerationZ} cm/s&sup2;</p>
                <p> Temperature: {telemetryContext.lowTemp}-{telemetryContext.highTemp}&deg;C</p>
                <p> Motor Run Time: {telemetryContext.motorRunTime} s</p>
            </div>

        </div>
    )
}

export default Telemetry