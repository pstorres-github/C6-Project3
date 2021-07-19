import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'

import AuthenticationContext from './AuthenticationContext'
import AuthenticationProvider from './AuthenticationProvider'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import PilotInfo from './components/PilotInfo'
import React from 'react'
import ScheduleJobs from './components/ScheduleJobs'
import WorkOrderDetails from './components/WorkOrderDetails'
import Workorders from './pages/Workorders'
import { useContext } from 'react'

function App() {
    return (
        <div className="contain">
            <AuthenticationProvider>
                <Router>
                    <div className="app-header">
                        <Header />
                    </div>

                    <div className="app-content">
                        <Switch>
                            <Route exact path="/" render={() => <Homepage />} />
                            <Route exact path="/workorders">
                                <Workorders />
                            </Route>
                            <Route exact path="/schedulejobs">
                                <ScheduleJobs />
                            </Route>
                            <Route exact path="/workorders/:id">
                                <WorkOrderDetails />
                            </Route>
                            <Route exact path="/pilot/:pilot">
                                <PilotInfo />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </AuthenticationProvider>
        </div>
    )
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
