import React, { Component, Fragment } from 'react'
import SingleDiscourse from './components/SingleDiscourse'
import { Router, withRouter, Route, Switch } from 'react-router-dom'
import DiscourseListContainer from './containers/DiscourseListContainer'
import { NavBar } from './components/NavBar'
import Data from './components/Data/Data'
import Player from './components/AudioStream/Player'
import { About } from './components/About'
import BottomNav from './components/BottomNavigation/BottomNav'
import Me from './components/Me/Me'
import {actionSetUser} from './state/user/reducer'
import { store } from './state/store';
import firebase from 'firebase';

class App extends Component {
  
  componentDidMount = async () => {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('MY USER IS3: ', user);
        
        store.dispatch(actionSetUser(user, true));
      } else {
        console.log('No user logged in');
  
  
      }
    })
  }
  render () {
    return (
      <div className='whole-app'>
        <NavBar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path='/me' component={Me} />
          <Route path='/about' component={About} />
          <Route path='/audio' component={Player} />
          <Route path='/data' component={Data} />
          <Route path='/discourse/:docId' component={SingleDiscourse} />
          <Route path='/' component={DiscourseListContainer} />

        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
