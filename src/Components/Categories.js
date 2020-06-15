import React, { useContext, useState } from 'react';
import { Category } from './Category';
import { GlobalContext } from '../Context/GlobalState';

export const Categories = ({ category }) => {
	const [ text, setText ] = useState('');
	const [ active, setActive ] = useState(false);
	const { categories } = useContext(GlobalContext);
	const { addCategory } = useContext(GlobalContext);
	const ids = categories.map((category) => category.id);

	let btnStyle = 'btn';
	btnStyle += !active ? ' disabled' : '';

	function findMax(catIDs) {
		let max = catIDs[0];

		if (catIDs[0] == undefined) {
			return 1;
		}

		for (let id of catIDs) {
			max = id > max ? id : max;
		}
		return max + 1;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		const newCat = {
			id: findMax(ids),
			value: findMax(ids),
			text
		};
		addCategory(newCat);
		setText('');
		setActive(false);
	};

	return (
		<React.Fragment>
			<h3>Select Category</h3>
			<select>{categories.map((category) => <Category key={category.id} category={category} />)}</select>
			<form id="htmlFormCat" onSubmit={onSubmit}>
				<div className="htmlForm-control">
					<label htmlFor="text">Add New Category</label>
					<input
						type="text"
						id="textCat"
						placeholder="Enter text..."
						onChange={(e) => {
							if (e.target.value != '') {
								setActive(true);
							} else {
								setActive(false);
							}
							setText(e.target.value);
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
