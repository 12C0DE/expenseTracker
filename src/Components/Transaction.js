import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

import Firebase from '../Firebase/Firebase';

export const Transaction = ({ transaction }) => {
	const { toggleCatAdded } = useContext(GlobalContext);
	const amountPositive = transaction.amount > 0 ? true : false;
	const sign = amountPositive ? '+' : '-';
	const switchIncExp = amountPositive > 0 ? 'Switch to Expense' : 'Switch to Income';

	function toggleIncomeExpense(docID, amt) {
		Firebase.firestore().collection('transactions').doc(docID).update({
			amount: amt * -1
		});
	}

	return (
		<li className={amountPositive < 0 ? 'minus' : 'plus'}>
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
	);
};
