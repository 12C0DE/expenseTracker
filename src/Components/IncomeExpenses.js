import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { AuthContext } from '../Firebase/Auth';
import Firebase from '../Firebase/Firebase';

export const IncomeExpenses = () => {
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
	const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
	const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

	return (
		<div className="inc-exp-container">
			<div id="incDiv">
				<h4>Income</h4>
				<p className="money plus">${income}</p>
			</div>
			<div id="expDiv">
				<h4>Expense</h4>
				<p className="money minus">${expense}</p>
			</div>
		</div>
	);
};
