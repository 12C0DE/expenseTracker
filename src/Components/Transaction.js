import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const Transaction = ({ transaction }) => {
	const { toggleCatAdded } = useContext(GlobalContext);
	const sign = transaction.amount > 0 ? '+' : '-';

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			<span className="transDate">{transaction.transDate}</span>
			<span className="notes">{transaction.text}</span>
			<span className="transAmount">
				{sign}
				$
				{Math.abs(transaction.amount)}
			</span>
			<button
				className="delete-btn"
				onClick={() => {
					toggleCatAdded(false);
				}}
			>
				x
			</button>
		</li>
	);
};
