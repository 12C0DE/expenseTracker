import React from 'react';
import Firebase from '../Firebase/Firebase';

export const Header = () => {
	return (
		<React.Fragment>
			<h1 id="moneyTitle">Money Tracker</h1>
			<span style={{ position: 'absolute', top: '0', right: '0' }}>
				<button id="btnLogout" onClick={() => Firebase.auth().signOut()}>
					LOG OUT
				</button>
			</span>
		</React.Fragment>
	);
};
