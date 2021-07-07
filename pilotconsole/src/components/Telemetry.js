import React, { useState, useEffect } from "react"
import throttle from 'lodash.throttle'

const Telemetry = ({ DroneState }) => {

    const [telemetryStream, setTelemetryStream] = useState('')

    useEffect(() => {
        DroneState.on('message', throttle((telemetryInformationStream) => {
            setTelemetryStream(`${JSON.stringify(parseState(telemetryInformationStream.toString()))}`)
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
                Telemetry:
                {telemetryStream}
            </div>

        </div>
    )
}

export default Telemetry