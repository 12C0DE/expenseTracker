import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
	const { transactions, selectedCategory } = useContext(GlobalContext);
	return (
		<React.Fragment>
			<h3>History</h3>
			<ul className="list">
				<li>
					<span className="notes">
						<i>Notes</i>
					</span>
					<span className="transDate">
						<i>Date</i>
					</span>
					<span className="transAmount">
						<i>Amount</i>
					</span>
				</li>
				{transactions
					.filter((transaction) => transaction.catID === selectedCategory)
					.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
			</ul>
		</React.Fragment>
	);
};
