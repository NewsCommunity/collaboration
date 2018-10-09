import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChatBox, ChatInput } from './index';
import { firestore } from '../../fire';
import Login from '../authentication/login';
import BottomNav from '../BottomNavigation/BottomNav';
import { thunkLogInUser, thunkLogOutUser, actionSetTipDestination } from '../../state/user/reducer';
import BlockChainBar from '../ethereum/BlockChainBar';
import ChatTrigger from './ChatTrigger';

const firebase = require('firebase');

class ChatBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatOpen: false,
    };

    this.getInitialMessages = this.getInitialMessages.bind(this);
    this.addSingleMessageToState = this.addSingleMessageToState.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.onShowToggle = this.onShowToggle.bind(this);
  }

  async componentDidMount() {
    const { discourseId } = this.props;

    this.subscribeToMessageUpdates(discourseId);
  }

  onShowToggle () {
    const { chatOpen } = this.state
    const toggleState = !chatOpen
    this.setState(() => ({ chatOpen: toggleState }))
  }

  async getInitialMessages (discourseId, limit = 50) {
    const messages = await firestore
            .collection('discourseList')
            .doc(discourseId)
            .collection('messages')
            .limit(limit)
            .orderBy('timestamp')
            .get()

    messages.forEach(message => {
      this.addSingleMessageToState(message.data())
    })
  }

  addSingleMessageToState (message) {
    const { messages } = this.state
    const newMessages = [...messages, message]
    this.setState({ messages: newMessages })
  }

  async subscribeToMessageUpdates (discourseId) {
    const { messages } = this.state
    await firestore
            .collection('discourseList')
            .doc(discourseId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(100)
            .onSnapshot(snapshot => {
              snapshot.docChanges().forEach(change => {
                const messageArray = messages
                messageArray.push(change.doc.data())
                this.setState({ messages: messageArray })
              })
            })
  }

  postMessage (message) {
    const { user, discourseId } = this.props
    const { displayName, uid, photoURL } = user
    const date = new Date()
    const messageObj = {
      body: message,
      userName: displayName,
      timestamp: date,
      uid,
      photoURL,
    };

    this.addSingleMessageToState(messageObj);
    firestore
            .collection('discourseList')
            .doc(discourseId)
            .collection('messages')
            .add(messageObj)
            .then(() => {})
            .catch(error => {
              console.log('Error adding document: ', error)
            })
  }

<<<<<<< HEAD
  render () {
    const { messages, chatOpen } = this.state
    const { logInUser, isLoggedIn, user, setTipDestination } = this.props
=======
  render() {
    const { messages, chatOpen } = this.state;
    const {
      logInUser, isLoggedIn, user, setTipDestination, tipDestination, isTipActive
    } = this.props;
>>>>>>> 4e2e35072aa14f6d1217b4c5403c290c5c08fbed

    console.log('The props of chatBucket are:', this.props)

    return (
      <div className={chatOpen ? 'Chatbucket-Container White-Background' : 'Chatbucket-Container'}>
<<<<<<< HEAD
        {isLoggedIn
                    ? <React.Fragment>
                      <BlockChainBar />
                      <ChatInput postMessage={this.postMessage} user={user} />
                    </React.Fragment>
                    : <span />}

        {chatOpen
                    ? <div>
                      <ChatBox msgArray={messages} setTipDestination={setTipDestination} />
                    </div>
                    : <div />}

=======
        {chatOpen ? (
          <React.Fragment>
            <div>
              <BlockChainBar tipDestination={tipDestination} />
              <ChatBox
                msgArray={messages}
                setTipDestination={setTipDestination}
              />
            </div>
          </React.Fragment>
        ) : (
          <div />
        )}
>>>>>>> 4e2e35072aa14f6d1217b4c5403c290c5c08fbed
        <BottomNav
          onShowToggle={this.onShowToggle}
          isOpen={chatOpen}
          isLoggedIn={isLoggedIn}
          logInUser={logInUser}
<<<<<<< HEAD
                />
=======
          postMessage={this.postMessage}
        />
>>>>>>> 4e2e35072aa14f6d1217b4c5403c290c5c08fbed
      </div>
    );
  }
}

// CONTAINER====================================================================
function mapState(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    tpDestination: state.userReducer.tipDestination,
    isTipActive: state.userReducer.isTipActive,
  };
}

function mapDispatch(dispatch) {
  return {
    logOutUser: () => {
      dispatch(thunkLogOutUser());
    },
    logInUser: () => {
      dispatch(thunkLogInUser());
    },
<<<<<<< HEAD
    setTipDestination: destination => {
      dispatch(actionSetTipDestination(destination))
    }
  }
=======
    setTipDestination: (destination) => {
      dispatch(actionSetTipDestination(destination));
    },
    postMessage: (message) => {
      dispatch();
    },
  };
>>>>>>> 4e2e35072aa14f6d1217b4c5403c290c5c08fbed
}

export default (ChatBucket = connect(mapState, mapDispatch)(ChatBucket))
