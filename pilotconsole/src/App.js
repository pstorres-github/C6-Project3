import React, {useContext} from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage'
import PilotConsole from './pages/PilotConsole'
import Header from './components/Header'
import AuthenticationProvider from './AuthenticationProvider'
import AuthenticationContext from "./AuthenticationContext"
import TelemetryProvider from './TelemetryProvider'

// Import Electron/Node Items
const electron = window.require('electron')
const dgram = electron.remote.require('dgram')

// Drone Connection
const DroneConnection = dgram.createSocket('udp4')
DroneConnection.bind(8001)

// Drone State
const DroneState = dgram.createSocket('udp4')
DroneState.bind(8890)

// Drone Video Feed
const DroneVideoFeed = dgram.createSocket('udp4')
DroneVideoFeed.bind(11111)

function App() {

  return (

    <TelemetryProvider>
      <AuthenticationProvider>

        <Router>

          <div className='app-header'>
            <Header />
          </div>

          <div className='app-content'>
            <Switch>
              <Route exact path='/' render={() => (<Homepage />)} />

              {/* Private path for pilot console.  If using guest account, logged in as guest */}
              {/* <PrivateRoute exact path='/pilotconsole'> <PilotConsole DroneConnection={DroneConnection} DroneState={DroneState} DroneVideoFeed={DroneVideoFeed} /> </PrivateRoute> */}
              <Route exact path='/pilotconsole' render={() => (<PilotConsole DroneConnection={DroneConnection} DroneState={DroneState} DroneVideoFeed={DroneVideoFeed} />)} />

            </Switch>
          </div>

        </Router>
      </AuthenticationProvider>
    </TelemetryProvider>



  )
}

// route wrapper.  Only allow access to PrivateRoutes if user is logged in
function PrivateRoute({ children, ...rest }) {

  const authContext = useContext(AuthenticationContext)
  console.log("authentication", authContext.email)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authContext.email ? (children) : (<Redirect to={{ pathname: "/", state: { from: location } }} />)
      }
    />
  );
}


export default App;