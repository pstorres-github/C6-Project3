import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css'

import Homepage from './pages/Homepage'
import PilotConsole from './pages/PilotConsole'
import AuthenticationProvider from './AuthenticationProvider'

// Import Electron/Node Items
const electron = window.require('electron')
const dgram = electron.remote.require('dgram')

// Drone Connection
const DroneConnection = dgram.createSocket('udp4')
DroneConnection.bind(8001)

// Drone Video Feed
const DroneVideoFeed = dgram.createSocket('udp4')
DroneVideoFeed.bind(11111)

function App() {

  return (
    <AuthenticationProvider>

      <Router>

        <div className='app-content'>
          <Switch>
            <Route exact path='/' render={() => (<Homepage />)} />
            <Route exact path='/pilotconsole' render={() => (<PilotConsole DroneConnection={DroneConnection} DroneVideoFeed={DroneVideoFeed} />)} />
          </Switch>
        </div>

      </Router>
    </AuthenticationProvider>


  )
}

export default App;