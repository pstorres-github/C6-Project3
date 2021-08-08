import { useEffect,useState, useRef } from "react"
import FlightPlan from "./FlightPlan"


const Preview = ({selectedJob}) => {

    //const [currentWorkOrder, setCurrentWorkOrder] = useState(selectedJob)
    //const [currentWorkOrderNumber, setCurrentWorkOrderNumber] = useState(selectedJob._id)
    //const [currentWorkOrderFlightPlan, setCurrentWorkOrderFlightPlan] = useState(selectedJob.flight_plan)

    const [userFlight, setUserFlight] =  useState()

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
            // console.log("flightById:", flightById);
            //console.log("responseData:", responseData);
            setUserFlight(responseData.flight)
        }
        fetchFlight()
        // console.log('userFlight:', userFlight)
        }
    },[selectedJob])
        
    if (!userFlight) return null  
    return (
            <div className="customer-workorder-preview">
                <div className="customer-workorder-preview-map">
                video preview
                Work Order preview: <br/>
                {/*Work Order Flight Plan Coordinates:{currentWorkOrderFlightPlan} <br/>**/}
                Work Order Number: {userFlight._id}<br/>
                Work Order Flight Plan length: {userFlight.flight_plan.length}<br/>
                
                {(userFlight.flight_plan.length !==0) && 
                    <FlightPlan updateWaypoints={() => {}} mode={"view"} initialValues={userFlight.flight_plan} reset={reset}/>}
                
                </div>
                <div className="customer-workorder-preview-video">
                <video
                        src={userFlight.videoURL}
                        width={'720'}
                        height={'720'}
                        muted={'muted'}
                        autoPlay
                        controls
                    ></video>
                </div>
            </div>

                
            )


}

export default Preview