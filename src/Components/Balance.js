import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const Balance = () => {
	const { transactions, selectedCategory } = useContext(GlobalContext);
	const amounts = transactions
		.filter((transaction) => transaction.catID === selectedCategory)
		.map((transaction) => transaction.amount);
	const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

	return (
		<React.Fragment>
			<h4 id="balance">Your Balance</h4>
			<h1>${total}</h1>
		</React.Fragment>
	);
};
