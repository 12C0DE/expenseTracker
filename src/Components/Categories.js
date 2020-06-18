import React, { useContext, useState } from 'react';
import { Category } from './Category';
import { GlobalContext } from '../Context/GlobalState';
import { SubmitBtn } from './SubmitBtn';

export const Categories = ({ category }) => {
	const [ text, setText ] = useState('');
	const [ active, setActive ] = useState(false);
	const { categories, addCategory, selectCategory, selectedCategory, showCategoryAdded, toggleCatAdded } = useContext(
		GlobalContext
	);
	const ids = categories.map((category) => category.id);

	const enableBtn = (e) => {
		if (e.target.value !== '') {
			setActive(true);
		} else {
			setActive(false);
		}
		setText(e.target.value);
	};

	function findMax(catIDs) {
		let maxID = catIDs[0];

		if (catIDs[0] === undefined) {
			return 1;
		}

		for (let id of catIDs) {
			maxID = id > maxID ? id : maxID;
		}
		return maxID + 1;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		//need to add logic to prevent duplicate entries being added! ******
		//does e.target.value or { text } exist in categories already???

		const newID = findMax(ids);
		const newCat = {
			id: newID,
			value: newID,
			text
		};
		addCategory(newCat);
		selectCategory(+newCat.id);
		setText('');
		setActive(false);
		toggleCatAdded(true);
	};

	return (
		<React.Fragment>
			<h3>Select Category</h3>
			<select
				value={selectedCategory}
				onChange={(e) => {
					toggleCatAdded(false);
					selectCategory(+e.target.value);
				}}
			>
				{categories
					.sort((a, b) => (a.text > b.text ? 1 : -1))
					.map((category) => <Category key={category.id} category={category} />)}
			</select>
			<form id="htmlFormCat" onSubmit={onSubmit}>
				<div className="htmlForm-control">
					<label htmlFor="text">Add New Category</label>
					<span className="categoryDiv" hidden={!showCategoryAdded}>
						<label className=" plus">Category Added!</label>
					</span>
					<input
						type="text"
						placeholder="Enter text..."
						onChange={(e) => {
							toggleCatAdded(false);
							enableBtn(e);
						}}
						value={text}
					/>
				</div>
				<SubmitBtn text="Add Category" active={active} />
			</form>
		</React.Fragment>
	);
};
