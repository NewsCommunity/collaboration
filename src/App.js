import React, { Component, Fragment } from 'react'
import fire from './fire'
import SingleDiscourse from './components/SingleDiscourse'
import { Router, withRouter, Route, Switch } from 'react-router-dom'
import DiscourseListContainer from './containers/DiscourseListContainer'
import Navbar from './components/NavBar'
import BarChart from './components/data/BarChart'

class App extends Component {
  render () {
    return (
      <div className='whole-app'>
        <Navbar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path='/data' component={BarChart} />
          <Route path='/discourse/:docId' component={SingleDiscourse} />
          <Route path='/' component={DiscourseListContainer} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
