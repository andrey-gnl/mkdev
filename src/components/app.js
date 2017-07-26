import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './Dashboard'

const Archive = () => (<h2>This is Archive Page</h2>)

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => (<h1>Home page</h1>)}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route path="/dashboard/archive" component={Archive}/>
        </Switch>
      </Router>
    )
  }
}
