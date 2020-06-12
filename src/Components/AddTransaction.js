import React, { useState } from 'react';

export const AddTransaction = () => {
	const [ text, setText ] = useState('');
	const [ amount, setAmount ] = useState(0);

	return (
		<React.Fragment>
			<h3>Add new transaction</h3>
			<form id="htmlForm">
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
