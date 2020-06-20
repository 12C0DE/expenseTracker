import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import Firebase from '../Firebase/Firebase';

export const Balance = () => {
	// const { transactions, selectedCategory } = useContext(GlobalContext);
	const { selectedCategory } = useContext(GlobalContext);
	const transactions = GetTransactions();

	function GetTransactions() {
		const [ transactions, setTransactions ] = useState([]);

		useEffect(() => {
			Firebase.firestore().collection('transactions').onSnapshot((dt) => {
				const tran = dt.docs.map((doc) => ({
					id: doc.id,
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
			<h1>${total}</h1>
		</React.Fragment>
	);
};
