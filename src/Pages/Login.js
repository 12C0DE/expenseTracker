import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import Firebase from '../Firebase/Firebase';
import { AuthContext } from '../Firebase/Auth';

const Login = ({ history }) => {
	const handleLogin = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await Firebase.auth().signInWithEmailAndPassword(email.value, password.value);
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[ history ]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<form className="logInDiv" onSubmit={handleLogin}>
			<h1 id="logInTitle">Log In</h1>
			<div id="divEmail">
				<label>Email</label>
				<input name="email" type="email" placeholder="Email" />
			</div>
			<div id="divPwd">
				<label>Password</label>
				<input name="password" type="password" placeholder="Password" />
			</div>
			<button id="logInBtn" type="submit" className="btn">
				Log In
			</button>
		</form>
	);
};

export default withRouter(Login);
