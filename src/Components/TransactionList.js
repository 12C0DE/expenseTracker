import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { ViewSelect } from '../Components/ViewSelect';
import { Transaction } from './Transaction';
import Firebase from '../Firebase/Firebase';

export const TransactionList = () => {
	const { selectedCategory, viewAmount } = useContext(GlobalContext);
	const transactions = GetTransactions();
	const [ loading, setLoading ] = useState(false);
	const [ currPage, setCurrPage ] = useState(1);
	const [ postsPerPage, setPostsPerPage ] = useState(10);
	const lastPostIndex = currPage * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;

	function GetTransactions() {
		const [ transactions, setTransactions ] = useState([]);

		useEffect(
			() => {
				Firebase.firestore()
					.collection('transactions')
					.where('catID', '==', selectedCategory)
					.orderBy('timeStmp', 'desc')
					.limit(viewAmount)
					.onSnapshot((dt) => {
						const tran = dt.docs.filter((doc) => doc.data).map((doc) => ({
							id: doc.id,
							...doc.data()
						}));
						setTransactions(tran);
					});
			},
			[ selectedCategory, viewAmount ]
		);
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
			<ViewSelect />
			<ul id="transList" className="list">
				{transHeader}
				{transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
			</ul>
		</React.Fragment>
	);
};
