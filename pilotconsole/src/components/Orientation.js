import React, { useState, useEffect, useContext } from "react"
import TelemetryContext from "../TelemetryContext"
import { Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import "./Orientation.css"

const Orientation = () => {

    const telemetryContext = useContext(TelemetryContext)

    return (
      <div className="subsection-Orientation">
        <Canvas>
        <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Drone rotation={[
                      telemetryContext.pitch * Math.PI / 180,
                      (telemetryContext.yaw-180) * Math.PI / 180, // so model is facing forward initially
                      telemetryContext.roll * Math.PI / 180
                    ]}
                    position={[0, 0, 0]}
                    scale={[.8, .8, .8]}
                    />
        </Canvas>
        <table className="orientation-table">
        <tr>
            <th>Pitch (deg)</th>
            <th>Yaw (deg)</th>
            <th>Roll (deg)</th>
            <th>Altitude (cm)</th>
        </tr>      
        <tr>
            <td>{telemetryContext.pitch}</td>
            <td>{telemetryContext.yaw}</td>
            <td>{telemetryContext.roll}</td>
            <td>{telemetryContext.altitude}</td>
        </tr>   
        </table>
     </div>
    )
  }
  

const Drone = ({position, rotation, scale}) => {
    const [model, setModel] = useState()
    const [arrow, setArrow] = useState()
    
    useEffect(() => {
        new GLTFLoader().load('./assets/drone.glb', setModel)
        new GLTFLoader().load('./assets/arrow.glb', setArrow)        
    },[])
    
    if (!model) {
        return null
    }
    
    return (
        <group position={position} rotation={rotation} scale={scale}>
        <primitive object = {model.scene} />
        <primitive object = {arrow.scene} />
        </group>
    )
}

export default Orientation