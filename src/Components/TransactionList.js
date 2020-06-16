import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
	const { transactions, selectedCategory } = useContext(GlobalContext);
	return (
		<React.Fragment>
			<h3>History</h3>
			<ul className="list">
				{transactions
					.filter((transaction) => transaction.catID === selectedCategory)
					.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
			</ul>
		</React.Fragment>
	);
};
