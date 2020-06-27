import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { Transaction } from './Transaction';
import Firebase from '../Firebase/Firebase';

export const TransactionList = () => {
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

	return (
		<React.Fragment>
			<h3 id="history">History</h3>
			<ul id="transList" className="list">
				<li>
					<span className="transDate">
						<i>Date</i>
					</span>
					<span className="notes">
						<i>Notes</i>
					</span>
					<span className="transAmount">
						<i>Amount</i>
					</span>
				</li>
				{transactions
					.filter((transaction) => transaction.catID === selectedCategory)
					.sort((a, b) => (a.timeStmp < b.timeStmp ? 1 : -1))
					.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
			</ul>
		</React.Fragment>
	);
};
