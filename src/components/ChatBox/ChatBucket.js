import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Selector, ResultSort, Rating } from 'react-giphy-selector';
import { ChatBox, ChatInput } from './index';
import { firestore } from '../../fire';
import Login from '../authentication/login';
import BottomNav from '../BottomNavigation/BottomNav';
import {
  thunkLogInUser,
  thunkLogOutUser,
  actionSetTipDestination,
  actionSetGif,
} from '../../state/user/reducer';
import BlockChainBar from '../Ethereum/BlockChainBar';
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

  onShowToggle() {
    const { chatOpen } = this.state;
    const toggleState = !chatOpen;
    this.setState(() => ({ chatOpen: toggleState }));
  }

  async getInitialMessages(discourseId, limit = 50) {
    const messages = await firestore
      .collection('discourseList')
      .doc(discourseId)
      .collection('messages')
      .limit(limit)
      .orderBy('timestamp')
      .get();

    messages.forEach((message) => {
      this.addSingleMessageToState(message.data());
    });
  }

  addSingleMessageToState(message) {
    const { messages } = this.state;
    const newMessages = [...messages, message];
    this.setState({ messages: newMessages });
  }

  async subscribeToMessageUpdates(discourseId) {
    const { messages } = this.state;
    await firestore
      .collection('discourseList')
      .doc(discourseId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const messageArray = messages;
          messageArray.push(change.doc.data());
          this.setState({ messages: messageArray });
        });
      });
  }

  postMessage(message, gif = {}) {
    const { user, discourseId } = this.props;
    const { displayName, uid, photoURL } = user;
    console.log("This gif:", gif);
    const date = new Date();
    const messageObj = {
      body: message,
      userName: displayName,
      timestamp: date,
      uid,
      photoURL,
      gif,
    };

    this.addSingleMessageToState(messageObj);
    firestore
      .collection('discourseList')
      .doc(discourseId)
      .collection('messages')
      .add(messageObj)
      .then(() => {})
      .catch((error) => {
        console.log('Error adding document: ', error);
      });
  }

  render() {
    const { messages, chatOpen } = this.state;
    const {
      logInUser,
      isLoggedIn,
      user,
      setTipDestination,
      tipDestination,
      isTipActive,
      GIFStatus,
      toggleGif,
    } = this.props;

    return (
      <div className={chatOpen ? 'Chatbucket-Container White-Background' : 'Chatbucket-Container'}>
        {GIFStatus ? (
          <div className="gifBar">
            <Selector
              apiKey="KP3uURmACOmXvXYKnYDjglkk5LAOu9DQ"
              onGifSelected={gif => this.postMessage("GIFGIF8x8", gif)}
            />
          </div>
        ) : (
          <div />
        )}
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
        <BottomNav
          onShowToggle={this.onShowToggle}
          isOpen={chatOpen}
          isLoggedIn={isLoggedIn}
          logInUser={logInUser}
          postMessage={this.postMessage}
          GIFStatus={GIFStatus}
          toggleGif={toggleGif}
          GIFStatus={GIFStatus}
        />
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
    GIFStatus: state.userReducer.GIFStatus,
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
    setTipDestination: (destination) => {
      dispatch(actionSetTipDestination(destination));
    },
    toggleGif: (bool) => {
      dispatch(actionSetGif(bool));
    },
  };
}

export default (ChatBucket = connect(
  mapState,
  mapDispatch,
)(ChatBucket));
