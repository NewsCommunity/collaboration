import React, { Component } from 'react'
import { connect } from 'react-redux'
import { thunkLogInUser, thunkLogOutUser, actionSetTipDestination } from '../../state/user/reducer'
import PublicKeyForm from './PublicKeyForm'

class Me extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    
    let { displayName } = this.props.user
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <p>Please log in to see your information</p>
        </div>
      )
    }
    return (
      <div>
        <p>Welcome, {displayName}</p>
        <p>Here you can set your public address</p>
        <PublicKeyForm />
      </div>
    )
  }
}

// CONTAINER====================================================================
function mapState (state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn
  }
}

function mapDispatch (dispatch) {
  return {
    logOutUser: () => {
      dispatch(thunkLogOutUser())
    },
    logInUser: () => {
      dispatch(thunkLogInUser())
    },
    setTipDestination: destination => {
      dispatch(actionSetTipDestination(destination))
    },
    postMessage: message => {
      dispatch()
    }
  }
}

export default connect(mapState, mapDispatch)(Me)
