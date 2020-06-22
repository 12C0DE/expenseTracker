import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

import Firebase from '../Firebase/Firebase';

export const Transaction = ({ transaction }) => {
	const { toggleCatAdded } = useContext(GlobalContext);
	const isPositive = transaction.amount > 0 ? true : false;
	const sign = isPositive ? '+' : '-';
	const switchInEx = isPositive > 0 ? 'Switch to Expense' : 'Switch to Income';

	function toggleIncomeExpense(docID, amt) {
		Firebase.firestore().collection('transactions').doc(docID).update({
			amount: amt * -1
		});
	}

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			<button
				// className="switch-btn"
				className={isPositive ? 'switch-btn switch-neg' : 'switch-btn switch-pos'}
				onClick={() => {
					toggleCatAdded(false);
					toggleIncomeExpense(transaction.id, transaction.amount);
				}}
			>
				{switchInEx}
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
};
