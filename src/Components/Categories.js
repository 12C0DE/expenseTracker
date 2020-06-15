import React, { useContext, useEffect, useState } from 'react';
import { Category } from './Category';
import { GlobalContext } from '../Context/GlobalState';

export const Categories = ({ category }) => {
	const [ text, setText ] = useState('');
	const [ active, setActive ] = useState(false);
	const { categories, addCategory, selectCategory, selectedCategory } = useContext(GlobalContext);
	const ids = categories.map((category) => category.id);

	let btnStyle = 'btn';
	btnStyle += !active ? ' disabled' : '';

	const enableBtn = (e) => {
		if (e.target.value != '') {
			setActive(true);
		} else {
			setActive(false);
		}
		setText(e.target.value);
	};

	function findMax(catIDs) {
		let maxID = catIDs[0];

		if (catIDs[0] == undefined) {
			return 1;
		}

		for (let id of catIDs) {
			maxID = id > maxID ? id : maxID;
		}
		return maxID + 1;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		const newID = findMax(ids);
		const newCat = {
			id: newID,
			value: newID,
			text
		};
		addCategory(newCat);
		setText('');
		setActive(false);
		selectCategory(newCat.id);
	};

	return (
		<React.Fragment>
			<h3>Select Category</h3>
			<select
				value={selectedCategory}
				onChange={(e) => {
					selectCategory(e.target.value);
				}}
			>
				{categories
					.sort((a, b) => (a.text > b.text ? 1 : -1))
					.map((category) => <Category key={category.id} category={category} />)}
			</select>
			<form id="htmlFormCat" onSubmit={onSubmit}>
				<div className="htmlForm-control">
					<label htmlFor="text">Add New Category</label>
					<input
						type="text"
						id="textCat"
						placeholder="Enter text..."
						onChange={(e) => {
							enableBtn(e);
						}}
						value={text}
					/>
				</div>
				<button className={btnStyle} disabled={!active}>
					Add Category
				</button>
			</form>
		</React.Fragment>
	);
};
