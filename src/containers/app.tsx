import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import routes from '@routes/index'
import './app.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((props) => {
            return <Route {...props} key={props.name} />
          })}
        </Switch>
      </Router>
    )
  }
}

export default App
