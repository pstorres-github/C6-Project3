import 'leaflet-offline'
import './FlightMap.css'
import 'bootstrap/dist/css/bootstrap.css'
//import './leaflet-providers.js'

import * as Yup from 'yup'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Map, Marker, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import React, { useContext, useEffect, useRef, useState } from 'react'

import JobDetailContext from '../JobDetailContext'
import L from 'leaflet'
import TelemetryContext from '../TelemetryContext'
import iconMarker from './assets/pin.png'
import localforage from 'localforage'

//Refactor:
//if drone is connected, start recording.
//store flight data directly to job context flight data

// Drone needs to be faced north intially
// Forward is +X speed (North)
// Backward is -X speed (South)
// Right is +Y speed (East)
// Left is -Y speed (West)

const FlightMap = () => {
    const jobContext = useContext(JobDetailContext)
    const telemetryContext = useContext(TelemetryContext)
    // reference variables (do not cause re-render)
    let initialLat = useRef(51.0447)
    let initialLng = useRef(-114.0719)

    let positionLat = useRef(51.0447)
    let positionLong = useRef(-114.0719)

    let timerID = useRef(null)

    let newDistance = 0
    let newBearing = 0

    //how often the speed is polled.  Time is in ms.
    const recordingInterval = 500

    // Calgary
    // 51.0447ºN, -114.0719ºW
    const [centerLat, setCenterLat] = useState(51.0447)
    const [centerLng, setCenterLng] = useState(-114.0719)
    // const [centerLat, setCenterLat] = useState(0)
    // const [centerLng, setCenterLng] = useState(0)
    const [coordinates, setCoordinates] = useState([])
    const [recording, setRecording] = useState(false)

    let currentXSpeed = useRef(0)
    let currentYSpeed = useRef(0)

    currentXSpeed.current = telemetryContext.speedX
    currentYSpeed.current = telemetryContext.speedY

    const [map, setMap] = useState()
    
    // Some mapping options

    // topographical map
    const URL1 = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
    const attribution1 = 'Tiles &copy; Esri'

    // airport data
    const URL2 = "http://2.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_basemap@EPSG%3A900913@png/{z}/{x}/{-y}.png"
    const attribution2 = '<a href="https://www.openaip.net/">openAIP Data</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'

    //satellite with streets 
    const URL3="https://api.mapbox.com/styles/v1/pstorres/cks70fjex09x617pnci9ccpq3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicHN0b3JyZXMiLCJhIjoiY2tzNnkzaHZ4MDRwbjJ3bm9jNG9vOXVuOCJ9.D77_DIhMPf7gCDFAL4bJAg"
    const attribution3= 'Tiles &copy; Mapbox'

    useEffect(() => {
        /*if (map) {
            L.tileLayer
                .offline(
                    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    localforage,
                    {
                        attribution:
                            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                        subdomains: 'abc',
                        minZoom: 15,
                        maxZoom: 22,
                        crossOrigin: true
                    }
                )
                .addTo(map)
        }*/

        if (map) {
            L.tileLayer
                .offline(
                    URL2,
                    localforage,
                    {
                        attribution:
                            attribution2,
                        subdomains: 'abc',
                        minZoom: 15,
                        maxZoom: 22,
                        crossOrigin: true
                    }
                )
                .addTo(map)

            L.tileLayer
                .offline(
                    URL3,
                    localforage,
                    {
                        attribution:
                            attribution3,
                        subdomains: 'abc',
                        minZoom: 15,
                        maxZoom: 22,
                        crossOrigin: true
                    }
                )
            .addTo(map)
                }
    }, [map])

    useEffect(() => {
        if (jobContext.flightPlan.length !== 0) {
            //setCenterLat(jobContext.flightPlan[0].lat)
            //setCenterLng(jobContext.flightPlan[0].lng)
            updateStartCoordinates(
                jobContext.flightPlan[0].lat,
                jobContext.flightPlan[0].lng
            )
        }
    }, [jobContext.flightPlan.length])

    //start recording if drone connected
    useEffect(() => {
        if (telemetryContext.droneStatus==='Connected')
            startRecording()
        if (telemetryContext.droneStatus==='Disconnected')
            stopRecording()
    }, [telemetryContext.droneStatus])

    // set up custom 'pin' type marker for flight path
    const markerIcon = L.icon({
        iconSize: [30, 30],
        //iconAnchor: [10, 41],
        //popupAnchor: [2, -40],
        iconUrl: iconMarker
    })

    // updates the positionLat, positionLong from input fields in formik form or getStartCoordinatesfromGoogle
    function updateStartCoordinates(lat, lng) {
        initialLat.current = lat
        initialLng.current = lng
        positionLat.current = lat
        positionLong.current = lng
        setCenterLat(lat)
        setCenterLng(lng)
        // update coordinate array with new coordinates
        setCoordinates((coordinates) => [[Number(lat), Number(lng)]])
    }

    function calculateDistanceAndBearing(NS_Distance, EW_Distance) {
        // NS_Distance is north-south distance.  X speed is in north direction, -X speed is in the south direction

        // distance is based on the NS, EW vector speeds, multiplied by the time to traverse the distance
        let distance =
            (Math.sqrt(Math.pow(NS_Distance, 2) + Math.pow(EW_Distance, 2)) *
                recordingInterval) /
            1000
        // Math.atan2(y/x) in cartesian coordinates
        let angle = Math.atan2(NS_Distance, EW_Distance) * (180 / Math.PI)
        // If value is in the 4th quadrant of the cartesian plane, bearing is 270+180-angle, otherwise bearing is 90 - angle
        let bearing =
            NS_Distance >= 0 && EW_Distance < 0 ? 450 - angle : 90 - angle

        console.log('distance in function', distance)
        console.log('angle in function', angle)
        console.log('bearing in function', bearing)
        newDistance = distance
        newBearing = bearing
    }

    function getNewCoordinates() {
        // using haversine formula for determining second set of lat and long
        // distance travelled in x plane = speed cm/s * flight time (1s)
        // https://www.igismap.com/formula-to-find-bearing-or-heading-angle-between-two-points-latitude-longitude/

        // Earth radius (in km)
        const radius = 6378

        // convert latitude/longitude degrees to radians
        console.log('latA is', positionLat.current)
        console.log('longA is', positionLong.current)

        const latA = positionLat.current * (Math.PI / 180)
        const longA = positionLong.current * (Math.PI / 180)
        const bearing = newBearing * (Math.PI / 180)

        // convert distance from drone from cm to km
        //**NOTE:  Due to the small scale of movement, this function pretends that a cm is actually a meter.  Otherwise the scale is too small to render on the google map
        let distance = newDistance / 1000
        console.log('distance in km', distance)

        let latB = Math.asin(
            Math.sin(latA) * Math.cos(distance / radius) +
                Math.cos(latA) * Math.sin(distance / radius) * Math.cos(bearing)
        )
        let longB =
            longA +
            Math.atan2(
                Math.sin(bearing) *
                    Math.sin(distance / radius) *
                    Math.cos(latA),
                Math.cos(distance / radius) - Math.sin(latA) * Math.sin(latB)
            )

        // convert back to degrees
        let latBdegrees = latB * (180 / Math.PI)
        let longBdegrees = longB * (180 / Math.PI)

        // round to 4 decimal places
        latBdegrees = Math.round(latBdegrees * 100000) / 100000
        longBdegrees = Math.round(longBdegrees * 100000) / 100000

        console.log('latBdegrees in getCoordinates', latBdegrees)
        console.log('longBdegrees in getCoordinates', longBdegrees)

        //update coordinates with new    
        jobContext.updateFlightData((coordinates) => [
            ...coordinates,
            [Number(latBdegrees), Number(longBdegrees)]
        ])
        
        // update coordinate array with new coordinates
        setCoordinates((coordinates) => [
            ...coordinates,
            [Number(latBdegrees), Number(longBdegrees)]
        ])


        positionLat.current = latBdegrees
        positionLong.current = longBdegrees
        // return array with new coordinates

        console.log('latB, longB', { latBdegrees, longBdegrees })
        console.log('coordinates in function', coordinates)
    }

    const defaultCenter = [Number(centerLat), Number(centerLng)]

    function startRecording() {
        console.log('Recording has started')
        setRecording(true)

        function doCalculations() {
            //only update array if the drone is moving
            if (currentXSpeed.current === 0 && currentYSpeed.current === 0)
                return

            console.log('currentspeedX', currentXSpeed.current)
            console.log('currentspeedY', currentYSpeed.current)
            calculateDistanceAndBearing(
                currentXSpeed.current,
                currentYSpeed.current
            )
            getNewCoordinates()
        }

        timerID.current = setInterval(doCalculations, recordingInterval)
    }

    function stopRecording() {
        console.log('Recording has stopped')
        setRecording(false)
        clearInterval(timerID.current)
        console.log("stored flight data",jobContext.flightData)

    }

    const handleClearRecording = () =>
        updateStartCoordinates(initialLat.current, initialLng.current)



    return (
        // V1.0 strictly for Friday demo day
        <div className="flightmap-container">
            <div className="position-query">
                <div className="menu-container">
                    <div className="form-container">
                        <Formik
                            initialValues={{ lat: '', lng: '' }}
                            // validates against the validation schema defined as Yup Object

                            validationSchema={Yup.object({
                                latitude: Yup.number().required('Required'),
                                longitude: Yup.number().required('Required')
                            })}
                            onSubmit={async (values) => {
                                // on submission of form, set the values of intial latitude and longitude
                                updateStartCoordinates(
                                    Number(values.latitude),
                                    Number(values.longitude)
                                )
                            }}
                        >
                            {/* touched object = true if field has been visited.  errors stores the all validation errros */}
                            {({ errors, touched }) => (
                                <Form className="form-initial-location">
                                    <div className="form-group">
                                        <div className="form-item">
                                            <span className="small-text inline">
                                                Edit starting coordinates: &nbsp;
                                            </span>
                                            <div className="inline">
                                                <Field
                                                    type="text"
                                                    name="latitude"
                                                    id="lat"
                                                    defaultValue={initialLat.current}
                                                    placeholder="Latitude (degrees)"
                                                    className={`form-control ${
                                                        touched.latitude &&
                                                        errors.latitude
                                                            ? 'is-invalid'
                                                            : ''
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="latitude"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <div className="form-item inline">
                                                {/* <label htmlFor="longitude">
                                                Enter starting longitude
                                                coordinate in degrees:
                                            </label> */}
                                                <Field
                                                    type="text"
                                                    name="longitude"
                                                    id="long"
                                                    defaultValue={initialLng.current}
                                                    placeholder="Longitude (degrees)"
                                                    className={`form-control ${
                                                        touched.longitude &&
                                                        errors.longitude
                                                            ? 'is-invalid'
                                                            : ''
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    name="longitude"
                                                    className="invalid-feedback"
                                                />
                                            </div>
                                            <div className="form-item inline">
                                                <button
                                                    type="submit"
                                                    className="map-button inline"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="lat-long inline">
                        <p className="small-text">
                            Current lat:{' '}
                            <span className="plex">
                                {positionLat.current}&deg;
                            </span>
                            &nbsp; long:{' '}
                            <span className="plex">
                                {positionLong.current}
                                &deg;
                            </span>
                        </p>
                    </div>
                    {/* <div className="spacer inline"></div> */}
                    <div className="recording-container">
                        <span className="small-text">
                            Storing flight data: &nbsp;
                            {recording && <> In Progress...</>}
                            {!recording && <> Paused... </>}
                        </span>

                        <button
                            onClick={handleClearRecording}
                            className="recording-button"
                        >
                            Clear
                        </button>

                    </div>

                    <div className="position-map">
                        <div id="mapid">
                            <Map
                                center={defaultCenter}
                                zoom={13}
                                scrollWheelZoom={true}
                                //whenCreated={(map) => setMap(map)}
                            >
                                {/*<TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />*/}

                                <TileLayer
                                    attribution={attribution3}
                                    url={URL3}
                                />
                                <TileLayer
                                    attribution={attribution2}
                                    url={URL2}
                                />

                                <Marker key={'start'} position={defaultCenter}>
                                    <Tooltip>
                                        {' '}
                                        Starting Position <br /> Lat:{' '}
                                        {initialLat.current}), Lng:{' '}
                                        {initialLng.current}
                                    </Tooltip>
                                </Marker>
                                <Polyline
                                    positions={coordinates}
                                    color={'red'}
                                />

                                {/* if view mode, do not allow updates to map. */}
                                {jobContext.flightPlan &&
                                    jobContext.flightPlan.map(
                                        (markers, index) => (
                                            <Marker
                                                icon={markerIcon}
                                                markerIndex={index}
                                                key={index}
                                                position={[
                                                    Number(markers.lat),
                                                    Number(markers.lng)
                                                ]}
                                            >
                                                <Tooltip>
                                                    {' '}
                                                    Location {index +
                                                        1} <br /> Lat:{' '}
                                                    {markers.lat}), Lng:{' '}
                                                    {markers.lng}
                                                </Tooltip>
                                            </Marker>
                                        )
                                    )}
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightMap

// V0.1 Original
//     <div>
//     <div className = "position-query">

//             <Formik
//                 initialValues = {{ lat: "", lng: "" }}
//                 // validates against the validation schema defined as Yup Object

//                 validationSchema = { Yup.object({
//                     latitude: Yup.number()
//                         .required('Value is Required'),
//                     longitude: Yup.number()
//                         .required('Value is Required'),
//                 })}

//                 onSubmit = {async (values)=> {
//                     // on submission of form, set the values of intial latitude and longitude
//                     updateStartCoordinates(Number(values.latitude),Number(values.longitude))
//                 }}
//             >

//                 {/* touched object = true if field has been visited.  errors stores the all validation errros */}
//                 {({errors, touched}) => (
//                     <Form className = "form-initial-location">
//                         <div className = "form-group">
//                         <div className="col-md">
//                                 <label htmlFor="latitude">Enter starting latitude coordinate in degrees</label>
//                                 <Field
//                                     type="text"
//                                     name ="latitude"
//                                     placeholder="Enter latitude coordinate in degrees"
//                                     className={`form-control ${touched.latitude && errors.latitude ? "is-invalid" :""}`}
//                                 />
//                                 <ErrorMessage
//                                     component="div"
//                                     name="latitude"
//                                     className="invalid-feedback"
//                                     />
//                             </div>
//                         </div>

//                         <div className = "form-group">
//                             <div className="col-md">
//                                 <label htmlFor="longitude">Enter starting longitude coordinate in degrees:</label>
//                                 <Field
//                                     type="text"
//                                     name ="longitude"
//                                     placeholder = "Enter longitude in degrees"
//                                     className={`form-control ${touched.longitude && errors.longitude ? "is-invalid" :""}`}
//                                     />
//                                 <ErrorMessage
//                                     component="div"
//                                     name="longitude"
//                                     className="invalid-feedback"
//                                     />
//                             </div>
//                         </div>

//                         <br/>
//                         <button type ="submit" className="btn btn-primary"> Submit </button>
//                     </Form>
//                 )}
//             </Formik>

//     <p>Current latitude: {positionLat.current}</p>
//     <p>Current longtitude: {positionLong.current}</p>

//     {!recording && <button onClick={()=>{startRecording(telemetryContext.accelerationX, telemetryContext.accelerationY); setRecording(true)}}> Start flight recording </button>}
//     {recording && <button> Recording....</button>}

//     <button onClick={()=>{clearInterval(timerID.current); console.log("recording stopped"); setRecording(false)}}> Stop flight recording </button>

//     <button onClick={handleClearRecording}> Clear flight recording </button>

//     </div>

//     <div className = "position-map">

//         <div id ="mapid">

//         <Map center={defaultCenter} zoom={13} scrollWheelZoom={true}>
//         <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker key={'start'} position={defaultCenter}/>

//         <Polyline positions={coordinates} color={'red'}/>

//         </Map>

//         </div>

//      </div>
// </div>
