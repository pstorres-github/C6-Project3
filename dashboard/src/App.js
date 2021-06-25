import './App.css';

import React from 'react'
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import Homepage from './pages/Homepage'
import ScheduleJobs from './components/ScheduleJobs'
import Workorders from './pages/Workorders'

import AuthenticationProvider from './AuthenticationProvider'


function App() {
  return (
      <AuthenticationProvider>
      <Router>
          <div className='app-content'>
                <Switch>
                  <Route exact path='/' render={() => (<Homepage />)} />
                  <Route exact path='/workorders' render={() => (<Workorders />)} />
                  <Route exact path='/schedulejobs' render={() => (<ScheduleJobs />)} />
                </Switch>
          </div>
      </Router>
      </AuthenticationProvider>
  );
}

export default App;
