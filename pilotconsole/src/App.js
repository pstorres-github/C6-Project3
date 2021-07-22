import './App.css'

import React, { useContext } from 'react'
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'

import AuthenticationContext from './AuthenticationContext'
import AuthenticationProvider from './AuthenticationProvider'
import Homepage from './pages/Homepage'
import PilotConsole from './pages/PilotConsole'
<<<<<<< HEAD
import PilotJobs from './pages/PilotJobs'

import Header from './components/Header'


import AuthenticationProvider from './AuthenticationProvider'
import AuthenticationContext from "./AuthenticationContext"
import JobDetailProvider from './JobDetailProvider'

=======
>>>>>>> 679cb3b864a82d38538fbd60a65a1bb4bfa51447
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
<<<<<<< HEAD

  return (

    <TelemetryProvider>
    <AuthenticationProvider>
    <JobDetailProvider>

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
              <Route exact path='/pilotjobs' render={() => (<PilotJobs />)} />
            </Switch>
          </div>

        </Router>
    
    </JobDetailProvider>
    </AuthenticationProvider>
    </TelemetryProvider>




  )
=======
    return (
        <TelemetryProvider>
            <AuthenticationProvider>
                <Router>
                    <div className="app-content">
                        <Switch>
                            <Route exact path="/" render={() => <Homepage />} />

                            {/* Private path for pilot console.  If using guest account, logged in as guest */}
                            {/* <PrivateRoute exact path='/pilotconsole'> <PilotConsole DroneConnection={DroneConnection} DroneState={DroneState} DroneVideoFeed={DroneVideoFeed} /> </PrivateRoute> */}
                            <Route
                                exact
                                path="/pilotconsole"
                                render={() => (
                                    <PilotConsole
                                        DroneConnection={DroneConnection}
                                        DroneState={DroneState}
                                        DroneVideoFeed={DroneVideoFeed}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </Router>
            </AuthenticationProvider>
        </TelemetryProvider>
    )
>>>>>>> 679cb3b864a82d38538fbd60a65a1bb4bfa51447
}

// route wrapper.  Only allow access to PrivateRoutes if user is logged in
function PrivateRoute({ children, ...rest }) {
    const authContext = useContext(AuthenticationContext)
    console.log('authentication', authContext.email)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                authContext.email ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: '/', state: { from: location } }}
                    />
                )
            }
        />
    )
}

export default App
