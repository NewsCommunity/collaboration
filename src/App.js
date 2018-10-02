import React, { Component } from 'react'
import fire from './fire'
import ChatBucket from './containers/ChatBucket'
import SingleDiscourse from './components/SingleDiscourse'
import { Router, withRouter, Route, Switch } from 'react-router-dom'
import DiscourseListContainer from './containers/DiscourseListContainer'
class App extends Component {
  render () {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path='/discourselist/' component={DiscourseListContainer} />
        <Route path='/discourse/:docId' component={SingleDiscourse} />
        <Route path='/' component={ChatBucket} />
      </Switch>
    )
  }
}

export default withRouter(App)
