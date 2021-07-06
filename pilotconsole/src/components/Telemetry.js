import React, { useState, useEffect } from "react"
import throttle from 'lodash.throttle'

const Telemetry = ({ DroneState }) => {

    const [telemetryStream, setTelemetryStream] = useState('')
    
    useEffect(() => {
        DroneState.on('message', throttle((telemetryInformationStream) => {
            setTelemetryStream(`${JSON.stringify(parseState(telemetryInformationStream.toString()))}`)
           }, 1000, { 'trailing': true }))
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

    /*
    DroneState.on('message', (telemetryInformationStream) => {
        setTelemetryStream(`${JSON.stringify(parseState(telemetryInformationStream.toString()))}`)
    })
*/
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