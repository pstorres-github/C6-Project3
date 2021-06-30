import React, { useState } from "react"

const Telemetry = ({ DroneState }) => {

    const [telemetryStream, setTelemetryStream] = useState('')

    const parseState = (state) => {
        return state
            .split(';')
            .map(x => x.split(':'))
            .reduce((data, [key, value]) => {
                data[key] = value;
                return data;
            }, {});
    }

    DroneState.on('message', (telemetryInformationStream) => {
        setTelemetryStream(`${JSON.stringify(parseState(telemetryInformationStream.toString()))}`)
         // console.log('Decoded Telemetry : ', JSON.stringify(parseState(telemetryInformationStream.toString())))
    })

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