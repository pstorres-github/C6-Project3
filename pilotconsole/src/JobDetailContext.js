import React from 'react'

const JobDetailContext = React.createContext({
    clearJob: () => {},
    updateActiveJob: (newJob) => {},
    activeJob:'',
    flightPlan:[],
    updateVideoFilename:(filename)=>{}
})

export default JobDetailContext