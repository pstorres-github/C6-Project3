import React from 'react'

const TelemetryContext = React.createContext({
    telemetryUpdate: (telemetryData) => {},
    pitch:'' ,
    yaw:'' ,
    roll:'',
    height:'',
    battery:'',
    speedX:'' ,
    speedY:'' ,
    speedZ:'' ,
    accelerationX:'',
    accelerationY:'' ,
    accelerationZ:'' ,
    timeOfFlightDistance:'',
    lowTemp:'',
    highTemp:'',
    motorRunTime:''

})

export default TelemetryContext