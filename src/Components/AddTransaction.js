import React, { useState, useContext } from 'react';
import { SubmitBtn } from './SubmitBtn';
import { GlobalContext } from '../Context/GlobalState';

import Firebase from '../Firebase/Firebase';

export const AddTransaction = () => {
	const [ text, setText ] = useState('');
	const [ amount, setAmount ] = useState('');
	const [ active, setActive ] = useState(false);
	const { addTransaction, selectedCategory, toggleCatAdded, todayDate } = useContext(GlobalContext);

	const handleAmountChange = (e) => {
		if (selectedCategory === 1) {
			setActive(false);
		} else if (e.target.value !== '0' && e.target.value !== '') {
			setActive(true);
		} else {
			setActive(false);
		}
		setAmount(e.target.value);
		toggleCatAdded(false);
	};

	const handleTextChange = (e) => {
		toggleCatAdded(false);
		setText(e.target.value);
	};

	//Submitting the transaction
	const onSubmit = (e) => {
		e.preventDefault();

		if (amount === 0 || selectedCategory === 1) {
			return;
		}

		const newTrans = {
			catID: selectedCategory,
			amount: +amount,
			text,
			transDate: todayDate,
			timeStmp: Date.now()
		};
		addTransaction(newTrans);

		Firebase.firestore()
			.collection('transactions')
			.add({
				amount: newTrans.amount,
				catID: newTrans.catID,
				text: newTrans.text,
				transDate: todayDate,
				timeStmp: newTrans.timeStmp
			})
			.then(() => {
				setText('');
				setActive(false);
				setAmount('');
			});
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
						step="0.01"
						id="amount"
						placeholder="0"
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
				<SubmitBtn text="Add Transaction" active={active} />
			</form>
		</React.Fragment>
	);
};
