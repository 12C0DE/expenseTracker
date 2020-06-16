import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const AddTransaction = () => {
	const [ text, setText ] = useState('');
	const [ amount, setAmount ] = useState(0);
	const [ active, setActive ] = useState(false);
	const { addTransaction, transactions, selectedCategory, toggleCatAdded } = useContext(GlobalContext);
	const ids = transactions.map((transaction) => transaction.id);

	let btnStyle = 'btn';
	btnStyle += !active ? ' disabled' : '';

	function findMax(transIDs) {
		let max = transIDs[0];

		if (transIDs[0] === undefined) {
			return 1;
		}

		for (let id of transIDs) {
			max = id > max ? id : max;
		}
		return max + 1;
	}

	const handleAmountChange = (e) => {
		if (e.target.value !== 0) {
			setActive(true);
		} else {
			setActive(false);
		}
		toggleCatAdded(false);
		setAmount(e.target.value);
	};

	const handleTextChange = (e) => {
		toggleCatAdded(false);
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (amount === 0) {
			return;
		}

		const newTrans = {
			id: findMax(ids),
			catID: selectedCategory,
			amount: +amount,
			text
		};
		addTransaction(newTrans);
		setText('');
		setActive(false);
		setAmount(0);
	};

	return (
		<React.Fragment>
			<h3>Add new transaction</h3>
			<form id="htmlForm" onSubmit={onSubmit}>
				<div className="htmlForm-control">
					<label htmlFor="amount">
						Amount <br />
					</label>
					<input
						type="number"
						id="amount"
						placeholder="Enter amount..."
						onChange={(e) => {
							handleAmountChange(e);
						}}
						value={amount}
					/>
					<div className="htmlForm-control">
						<label htmlFor="text">Notes</label>
						<input
							type="text"
							id="text"
							placeholder="Enter text..."
							onChange={(e) => {
								handleTextChange(e);
							}}
							value={text}
						/>
					</div>
				</div>
				<button className={btnStyle}>Add transaction</button>
			</form>
		</React.Fragment>
	);
};
