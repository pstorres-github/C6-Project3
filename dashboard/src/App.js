import './App.css';

import React from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom'

import Homepage from './pages/Homepage'
import ScheduleJobs from './components/ScheduleJobs'
import Header from './components/Header'
import Workorders from './pages/Workorders'

import AuthenticationProvider from './AuthenticationProvider'
import AuthenticationContext from "./AuthenticationContext"
import { useContext } from "react"

function App() {

  return (
      <AuthenticationProvider>
      <Router>
          <div className='app-header'>
            <Header/>
          </div>


          <div className='app-content'>
                <Switch>
                  <Route exact path='/' render={() => (<Homepage />)} />
                  <PrivateRoute exact path='/workorders'> <Workorders/> </PrivateRoute>
                  <PrivateRoute exact path='/schedulejobs'> <ScheduleJobs/> </PrivateRoute>
                </Switch>
          </div>
      </Router>
      </AuthenticationProvider>
  );
}

// route wrapper.  Only allow access to PrivateRoutes if user is logged in
function PrivateRoute({ children, ...rest }) {
 
  const authContext = useContext(AuthenticationContext)
  console.log("authentication", authContext.email)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authContext.email ? (children) : (<Redirect to={{pathname: "/",state: { from: location }}}/>)
      }
    />
  );
}


export default App;
