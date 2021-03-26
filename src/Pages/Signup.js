import React, { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../Firebase/Auth';
import Firebase from '../Firebase/Firebase';

const Signup = () => {
	const handleSignUp = useCallback(async (event) => {
		event.preventDefault();

		const { emailS, passwordS, confirmpwdS, fnameS, lnameS } = event.target.elements;

		if (passwordS.value !== confirmpwdS.value) {
			alert('Password does not match');
			return;
		}

		if (fnameS.value === '' || lnameS.value === '') {
			alert('Name fields need to be filled out');
			return;
		}

		try {
			await Firebase.auth().createUserWithEmailAndPassword(emailS.value, passwordS.value);

			const currUid = Firebase.auth().currentUser.uid;

			Firebase.firestore()
				.collection('users')
				.add({ fname: fnameS.value, lname: lnameS.value, email: emailS.value, uid: currUid });

			Firebase.firestore().collection('categories').add({
				id    : 1,
				text  : '—Select Category—',
				uid   : currUid,
				value : 1
			});
		} catch (err) {
			alert(err.message);
			console.log(err.message);
		}
	}, []);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<React.Fragment>
			<form className="signUpDiv" onSubmit={handleSignUp}>
				<h1 id="logInTitle">Money Tracker</h1>
				<div>
					<label>First name</label>
					<input name="fnameS" type="text" />
					<label>Last name</label>
					<input name="lnameS" type="text" />
				</div>
				<div id="">
					<label>Email</label>
					<input name="emailS" type="email" />
				</div>
				<div id="">
					<label>Password</label>
					<input name="passwordS" type="password" />
					<label>Confirm Password</label>
					<input name="confirmpwdS" type="password" />
				</div>
				<button id="signUpBtn" className="btn" type="submit">
					Sign Up
				</button>
			</form>
			<div>
				<h3>
					<Link to="/login"> Log in</Link>
				</h3>
			</div>
		</React.Fragment>
	);
};

export default withRouter(Signup);
