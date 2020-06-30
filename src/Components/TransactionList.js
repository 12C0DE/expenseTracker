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

	function useWindowWidth() {
		const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

		useEffect(() => {
			function handleResize() {
				setWindowWidth(window.innerWidth);
			}

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);
		return windowWidth;
	}

	const breakpoint = 769;
	const widthSize = useWindowWidth();

	const transHeader =
		widthSize < breakpoint ? (
			<li>
				<span className="toggleDiv">
					<i>Toggle</i>
				</span>
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
		) : (
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
		);

	return (
		<React.Fragment>
			<h3 id="history">History</h3>
			<ul id="transList" className="list">
				{transHeader}
				{transactions
					.filter((transaction) => transaction.catID === selectedCategory)
					.sort((a, b) => (a.timeStmp < b.timeStmp ? 1 : -1))
					.map((transaction) => (
						<Transaction key={transaction.id} transaction={transaction} winWidth={widthSize} />
					))}
			</ul>
		</React.Fragment>
	);
};
