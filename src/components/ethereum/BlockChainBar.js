import React, { Component } from 'react';
import { firestore } from '../../fire';
import Login from '../authentication/login';
import BottomNav from '../BottomNavigation/BottomNav';
//import { thunkLogInUser, thunkLogOutUser } from "../../state/user/reducer";
import { connect } from 'react-redux';
var firebase = require('firebase');

class BlockChainBucket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tipAmount: 0,
			currentAccount: '0x0',
			currentBalance: 0,
			accounts: [],
			destination: '0x0'
		};
	}

	async componentDidMount() {}

	render() {
		const { tipAmount, currentAccount, currentBalance, accounts, destination } = this.state;
		const { logOutUser, logInUser, isLoggedIn, displayName } = this.props;
		return (
			<div className="BlockChain-Bar">
				<div>0.0ETH</div>

				<div className="BlockChain-Center">
					<div>
						<button class="mdl-button mdl-js-button mdl-button--icon">
							<i class="material-icons">expand_more</i>
						</button>
					</div>
					<span class="mdl-chip mdl-chip--deletable">
						<span class="mdl-chip__text">0.1 ETH</span>
						<button type="button" class="mdl-chip__action">
							<i class="material-icons">whatshot</i>
						</button>
					</span>
					<div>
						<button class="mdl-button mdl-js-button mdl-button--icon">
							<i class="material-icons">expand_less</i>
						</button>
					</div>
				</div>

				<div>
					
					<button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
						<i class="material-icons">more_vert</i>
					</button>

					<ul
						class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
						for="demo-menu-lower-right"
					>
						<li class="mdl-menu__item">Some Action</li>
						<li class="mdl-menu__item">Another Action</li>
						<li disabled class="mdl-menu__item">
							Disabled Action
						</li>
						<li class="mdl-menu__item">Yet Another Action</li>
					</ul>
				</div>
			</div>
		);
	}
}

//CONTAINER====================================================================
function mapState(state) {
	return {
		user: state.userReducer.user,
		isLoggedIn: state.userReducer.isLoggedIn
	};
}

function mapDispatch(dispatch) {
	return {
		// logOutUser: () => {
		// 	dispatch(thunkLogOutUser());
		// },
		// logInUser: () => {
		// 	dispatch(thunkLogInUser());
		// }
	};
}

BlockChainBucket = connect(mapState, mapDispatch)(BlockChainBucket);

export default BlockChainBucket;
