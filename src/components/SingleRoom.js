import React, { Component } from 'react';
import ChatBucket from '../containers/ChatBucket';

const SingleRoom = (props) => {
	return (
		<div>
			<div className="discourse-container">
				<h1>publicDiscourse</h1>
				<div className="iframe-container">
					<iframe
						src="https://www.huffingtonpost.com/entry/michael-avenatti-donald-trump-brett-kavanaugh_us_5bac5b68e4b082030e782124"
						frameborder="0"
					/>
				</div>
				<div className="footer">
					<ChatBucket />
				</div>
			</div>
		</div>
	);
};

export default SingleRoom;
