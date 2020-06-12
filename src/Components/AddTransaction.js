import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const AddTransaction = () => {
	const [ text, setText ] = useState('');
	const [ amount, setAmount ] = useState(0);
	const { addTransaction } = useContext(GlobalContext);
	const { transactions } = useContext(GlobalContext);
	const ids = transactions.map((transaction) => transaction.id);

	function findMax(transIDs) {
		let max = transIDs[0];

		for (let id of transIDs) {
			max = id > max ? id : max;
		}
		return max + 1;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		const newTrans = {
			id: findMax(ids),
			text,
			amount: +amount
		};
		addTransaction(newTrans);
	};

	return (
		<React.Fragment>
			<h3>Add new transaction</h3>
			<form id="htmlForm" onSubmit={onSubmit}>
				<div className="htmlForm-control">
					<label htmlFor="text">Text</label>
					<input
						type="text"
						id="text"
						placeholder="Enter text..."
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
				</div>
				<div className="htmlForm-control">
					<label htmlFor="amount">
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type="number"
						id="amount"
						placeholder="Enter amount..."
						onChange={(e) => setAmount(e.target.value)}
						value={amount}
					/>
				</div>
				<button className="btn">Add transaction</button>
			</form>
		</React.Fragment>
	);
};
