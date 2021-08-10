import { useEffect,useState, useRef }from "react"
import React from "react"
import FlightPlan from "./FlightPlan"


const Preview = ({selectedJob}) => {

    const [userFlight, setUserFlight] =  useState()
    const [userFlightPlan, setUserFlightPlan] =  useState()

    const reset = useRef(false)

    useEffect (()=> {

        if (selectedJob) {
            const fetchFlight = async () => {
                let flightById = await fetch(
                    `/api/work_orders/work_order/${selectedJob._id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                console.log('userFlight:', userFlight)

                let responseData = await flightById.json()
                setUserFlight(responseData.flight)
                setUserFlightPlan(responseData.flight.flight_plan)
                console.log(userFlightPlan)
            }
            fetchFlight()
        }
    },[selectedJob])

    if (!userFlight) return null

    return (
            <React.Fragment>
                <div className="customer-workorder-preview-description">
                    {/*Work Order Flight Plan Coordinates:{currentWorkOrderFlightPlan} <br/>**/}
                    <h3>Preview:</h3>
                    Work Order Number: {userFlight._id.slice(0,8)}<br/>
                    {(userFlight.flight_plan.length === 0) && <>Flight plan not provided</>}<br/>
                    {(!userFlight.videoURL) && <>Flight video is not available</>}

                </div>

                <div className="customer-workorder-preview-map">
                               
                {(userFlight.flight_plan.length !==0) && 
                        <FlightPlan updateWaypoints={() => {}} mode={"view"} initialValues={userFlightPlan} reset={reset} flightData={userFlight.flight_data ? userFlight.flight_data : [] }/>}

                </div>


                <div className="customer-workorder-preview-video">
                    
                    {(userFlight.videoURL) &&
                    <video
                            id={"videoPreview"}
                            src={userFlight.videoURL}
                            muted={'muted'}
                            width={350}
                            autoPlay
                            controls
                    ></video>
                    }
                
                </div>
            </React.Fragment>

                
            )


}

export default Preview