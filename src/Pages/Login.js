import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { AuthContext } from '../Firebase/Auth';
import { Link } from 'react-router-dom';
import Firebase from '../Firebase/Firebase';

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
		[
			history
		]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<React.Fragment>
			<form className="logInDiv" onSubmit={handleLogin}>
				<h1 id="logInTitle">Money Tracker</h1>
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
			<div>
				<h3>
					<Link to="/signup">sign up</Link> here
				</h3>
			</div>
		</React.Fragment>
	);
};

export default withRouter(Login);
