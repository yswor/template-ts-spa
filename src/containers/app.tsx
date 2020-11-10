import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import routes from '@routes/index'
import './app.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(({ key, ComponentName, path, exact, routes }) => {
            return (
              <Route
                exact={exact}
                path={path}
                key={key}
                render={props => <ComponentName {...props} routes={routes} />}
              />
            )
          })}
        </Switch>
      </Router>
    )
  }
}

export default App
