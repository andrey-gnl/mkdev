import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard'
import Archive from './Archive'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => (<h1>Home page</h1>)} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/archive" component={Archive} />
    </Switch>
  </Router>
)

export default App
