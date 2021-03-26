import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { AuthContext } from '../Firebase/Auth';
import Firebase from '../Firebase/Firebase';

export const Balance = () => {
	const { selectedCategory } = useContext(GlobalContext);
	const transactions = GetTransactions();
	const { currentUser } = useContext(AuthContext);

	function GetTransactions() {
		const [
			transactions,
			setTransactions
		] = useState([]);

		useEffect(() => {
			Firebase.firestore().collection('transactions').where('uid', '==', currentUser.uid).onSnapshot((dt) => {
				const tran = dt.docs.map((doc) => ({
					id : doc.id,
					...doc.data()
				}));
				setTransactions(tran);
			});
		}, []);
		return transactions;
	}

	const amounts = transactions
		.filter((transaction) => transaction.catID === selectedCategory)
		.map((transaction) => transaction.amount);
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	return (
		<React.Fragment>
			<h4 id="balance">Your Balance</h4>
			<h1 id="total">${total}</h1>
		</React.Fragment>
	);
};
