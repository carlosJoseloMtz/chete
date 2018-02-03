import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import StorefrontApp from './storefront'

const NotFound = _ => {
  return <div>
    App not found :V
  </div>
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/storefront/:component"
            component={StorefrontApp} />
          <Route
            component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
