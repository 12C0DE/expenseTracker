import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { ViewSelect } from '../Components/ViewSelect';
import { Transaction } from './Transaction';
import Firebase from '../Firebase/Firebase';

export const TransactionList = () => {
	const { selectedCategory, viewAmount, currPage, changeCurrPage } = useContext(GlobalContext);
	const transactions = GetTransactions();
	const lastPostIndex = currPage * viewAmount;
	const firstPostIndex = lastPostIndex - viewAmount;
	let transCount = lastPostIndex > transactions.length ? transactions.length : lastPostIndex;
	const currTrans =
		currPage === 1 ? transactions.slice(0, viewAmount) : transactions.slice(firstPostIndex, lastPostIndex);

	function PrevCurrPage() {
		if (currPage > 1) {
			changeCurrPage(currPage - 1);
			transCount = lastPostIndex;
		}
	}

	function NextCurrPage() {
		if (transactions.length > currPage * viewAmount) {
			changeCurrPage(currPage + 1);
		}
	}

	function GetTransactions() {
		const [ transactions, setTransactions ] = useState([]);

		useEffect(
			() => {
				Firebase.firestore()
					.collection('transactions')
					.where('catID', '==', selectedCategory)
					.orderBy('timeStmp', 'desc')
					.onSnapshot((dt) => {
						const tran = dt.docs.filter((doc) => doc.data).map((doc) => ({
							id: doc.id,
							...doc.data()
						}));
						setTransactions(tran);
					});
			},
			[ selectedCategory, viewAmount, currPage ]
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

	const viewCount =
		transCount > 0 ? (
			<span>
				<i>
					{firstPostIndex + 1}-{transCount}
				</i>
			</span>
		) : null;

	return (
		<React.Fragment>
			<h3 id="history">History</h3>
			<ViewSelect />
			<div>
				<button className="btn" onClick={PrevCurrPage}>
					Prev {viewAmount}
				</button>
				<button className="btn" onClick={NextCurrPage}>
					Next {viewAmount}
				</button>
				{viewCount}
			</div>
			<ul id="transList" className="list">
				{transHeader}
				{currTrans.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
			</ul>
		</React.Fragment>
	);
};
