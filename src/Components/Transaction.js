import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalState';

import Firebase from '../Firebase/Firebase';

export const Transaction = ({ transaction }) => {
	const { toggleCatAdded } = useContext(GlobalContext);
	const amountPositive = transaction.amount > 0 ? true : false;
	const sign = amountPositive ? '+' : '-';
	const toggleSign = amountPositive ? '-' : '+';
	const switchIncExp = amountPositive ? 'Switch to Expense' : 'Switch to Income';

	function toggleIncomeExpense(docID, amt) {
		Firebase.firestore().collection('transactions').doc(docID).update({
			amount: amt * -1
		});
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

	const transItem =
		widthSize > breakpoint ? (
			<li className={amountPositive ? 'plus' : 'minus'}>
				<button
					className={amountPositive ? 'switch-btn switch-neg' : 'switch-btn switch-pos'}
					onClick={() => {
						toggleCatAdded(false);
						toggleIncomeExpense(transaction.id, transaction.amount);
					}}
				>
					{switchIncExp}
				</button>
				<span className="transDate">{transaction.transDate}</span>
				<span className="notes">{transaction.text}</span>
				<span className="transAmount">
					{sign}
					$
					{Math.abs(transaction.amount)}
				</span>
			</li>
		) : (
			<li className={amountPositive ? 'plus' : 'minus'}>
				<button
					className="toggleBtn"
					onClick={() => {
						toggleCatAdded(false);
						toggleIncomeExpense(transaction.id, transaction.amount);
					}}
				>
					{toggleSign}
				</button>
				<span className="transDate">{transaction.transDate}</span>
				<span className="notes">{transaction.text}</span>
				<span className="transAmount">
					{sign}
					$
					{Math.abs(transaction.amount)}
				</span>
			</li>
		);

	return transItem;
};
