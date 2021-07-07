import React from 'react'

const TelemetryContext = React.createContext({
    telemetryUpdate: (telemetryData) => {},
    pitch: '',
    yaw:'',
    roll:'',
    height:''
})

export default TelemetryContext