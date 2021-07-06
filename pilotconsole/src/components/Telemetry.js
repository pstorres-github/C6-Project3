import React, { useState } from "react"

const Telemetry = ({ DroneState }) => {

    // let TelemetryInfo = ''
    const [telemetryStream, setTelemetryStream] = useState('')

    // const updateTelemetry =  () => {
    //     setTelemetryStream(TelemetryInfo)
    // }
    
    // let telemetryThrottle = setInterval(updateTelemetry, 500)

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
        // TelemetryInfo = `${JSON.stringify(parseState(telemetryInformationStream.toString()))}`
        setTelemetryStream(`${JSON.stringify(parseState(telemetryInformationStream.toString()))}`)
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