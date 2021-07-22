import React from 'react'

const JobDetailContext = React.createContext({
    clearJob: () => {},
    updateActiveJob: (newJob) => {},
    activeJob:'',
    flightPlan:[]
})

export default JobDetailContext