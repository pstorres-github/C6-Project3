import { Map, TileLayer, Marker, Tooltip, Polyline} from "react-leaflet";
import { useEffect, useState} from "react";
import L from 'leaflet' 
import './FlightPlan.css'
import iconMarker from '../assets/pin.png' 
import deleteIcon from '../assets/delete.png' 

const FlightPlan = (({updateWaypoints, mode, initialValues=[], reset, flightData=[]}) => {
/* props notes:  if mode = write, then way points can be updated.  if mode = view, waypoints cannot be updated */

    const [markers, setMarkers] = useState(initialValues)
//    const mapRef = useRef()

    //default center of Calgary
    const [defaultCenter, setDefaultCenter] = useState([Number(51.0511),Number(-114.08529)])

    useEffect(()=>{
        /*watch prop(reset).  If it is set to true, clear markers */
        if (reset.current===true) {
            resetMarkers()
            reset.current = false
        }    
        console.log('reset called')

    },[reset.current])

    //useEffect(()=>{
    //     // // if viewing a flight plan with established points, center map on the first waypoint
    //     // // else, locate the user and center the map on their position
    //     // if (markers.length ===0) {
    //     //   const {current={}}=mapRef  // allows grabbing the leaflet element
    //     //   const {leafletElement: map} = current 
    //     //   //if location is found, the map will center on this location for initial rendering
    //     //   map.locate({
    //     //     setView: true,
    //     //     setZoom: true
    //     //   })
    //     // }    
    //     //   //send the updated way points to the parent component
    //    updateWaypoints(markers)
    //},[markers])

    useEffect (()=> {
        setMarkers(initialValues)
        if (initialValues.length !== 0) {
            setDefaultCenter([initialValues[0].lat, initialValues[0].lng])
            console.log([initialValues[0].lat, initialValues[0].lng])
        }

   },[initialValues])

    // set up custom 'pin' type marker for flight path
    const markerIcon = L.icon({
        iconSize: [30, 30],
        //iconAnchor: [10, 41],
        //popupAnchor: [2, -40],
        iconUrl: iconMarker,
      });   

    function addMarker(e) {
        setMarkers ([...markers,e.latlng])
    }
    
    // if markers are dragged to another location, update the marker array with the new coordinates
    function updateMarker(e) {
        let updatedMarkers = [...markers]
        updatedMarkers[e.target.options.markerIndex]=e.target._latlng
        setMarkers (updatedMarkers)
    }

    function deleteMarker(index) {
        let updatedMarkers = [...markers]
        updatedMarkers.splice(index,1)
        setMarkers (updatedMarkers)
    }

    //allows user to reset and clear all markers
    function resetMarkers() {
        setMarkers([])
    }
 //   ref={mapRef}
    return (
        <div className="map-container">
          <div id ="mapid" className="map">
    
            <Map center={defaultCenter} zoom={16} scrollWheelZoom={false} onClick={mode==="view" ? ()=>{}: (e) => {addMarker(e)}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* if view mode, do not allow updates to map. */}
                {markers.map((markers,index)=>
                    <Marker icon={markerIcon} markerIndex={index} key={index} draggable={mode==="view" ? false:true} onDragend={(e)=>updateMarker(e)} position={[Number(markers.lat),Number(markers.lng)]}>   
                        <Tooltip> Location {index+1}</Tooltip>
                    </Marker>
                )}

                {/* if view mode and flight data is available, show path on map*/}
                {((mode==="view") && (flightData.length!==0)) && <Polyline positions={flightData} color={'red'}/>}
                
                    
            </Map>

            {/* list of coordinates of the markers and delete icon */}
            {markers.map((markers,index)=>
                // only show X (delete icon) if NOT in view mode
                <> {  mode==="write"  && <img className="delete-button" key={index} src={deleteIcon} alt="X" onClick={()=>deleteMarker(index)}/>}
                    #{index+1}, Lat:{Number(markers.lat)}, Lng{Number(markers.lng)}<br/></>
            )}

            {/* if view mode, do not allow updates to map, thus do not show instructions */}
            { mode==="view" ? <></> : 
                    <div className="map-instructions">
                        <p>Waypoint (Flight Path) Instructions:<br/>
                        Click on map to add waypoints.<br/>
                        Markers can be dragged to new location if required.<br/>
                        Delete marker by clicking on 'X' icon in list.</p>
                        <button onClick={resetMarkers}>Clear all waypoints from map</button> 
                    </div>
            }

          </div>
        </div>
    );

})

export default FlightPlan