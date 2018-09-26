import types from './types';
import fire from '../../fire';

export function setChatMessages(messages) {
	return {
		type: types.SET_CHAT_MESSAGES,
		messages
	};
}


const demoData = {text: "", id: "-LNMaYZP70GirAaotNzF"}

export function getChatMessages_THUNK(articleId = 'messages'){
  return async (dispatch) => {
    const demoMess = [demoData];
    dispatch(setChatMessages(demoMess))
  }
}

//I am defining this outside of the function so that when we recall the
//subscribeToDatabase we are sure to overright the previous instance
//of messages. This might solve our unsubcribe needs.
let messagesRef;

export function subscribeToDatabase_THUNK(databaseId = 'messages', limit=100){
  return async (dispatch) => {

    messagesRef = fire.database().ref(databaseId).orderByKey().limitToLast(limit);
    console.log("Inside the subscribe to database action. Messages is: ", messagesRef)

    //now we subscribe to messages
    //We should check if on subsequent calls we changed our DatabaseID. In which case we should now resubscibe to a new message.
    messagesRef.on('child_added', (snapshot) => {

      console.log("Database data flowing in....", messagesRef);
      let message = { text: snapshot.val(), id: snapshot.key};
      console.log("This is the shape of the received messages: ", message);
      dispatch(setChatMessages(message));
    })
  }
}

export function postToDatabase(message, databaseId = 'messages'){
  return async (dispatch) => {
    console.log("Wer're firing!!!");
    const res = await fire.database().ref(databaseId).push(message);
    console.log("Return value from posting to database is:  ", res)
  }
}

// //we only care about one address right now
// export function getUserAccounts_THUNK(web3) {
// 	return async (dispatch) => {
// 		dispatch(setWeb3Fetch(true));
// 		const accounts = await getAccounts(web3);
// 		dispatch(setUserAccounts(accounts[0]));
// 		dispatch(getAddressBalance_THUNK(web3, accounts[0]));
// 	};
// }

// //helper function
// async function getAccounts(web3) {
// 	return await web3.accounts();
// }


