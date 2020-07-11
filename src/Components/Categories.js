import React, { useContext, useState, useEffect } from 'react';
import { Category } from './Category';
import { GlobalContext } from '../Context/GlobalState';
import { SubmitBtn } from './SubmitBtn';
import Firebase from '../Firebase/Firebase';

export const Categories = () => {
	const [ text, setText ] = useState('');
	const [ active, setActive ] = useState(false);
	const { selectCategory, selectedCategory, showCategoryAdded, toggleCatAdded, changeCurrPage } = useContext(
		GlobalContext
	);

	function GetCats() {
		const [ cats, setCats ] = useState([]);

		useEffect(() => {
			const unsubscribe = Firebase.firestore().collection('categories').onSnapshot((snapshot) => {
				const category = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}));
				setCats(category);
			});
			return () => {
				unsubscribe();
			};
		}, []);
		return cats;
	}

	const categories = GetCats();
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
		// addCategory(newCat);
		selectCategory(+newCat.id);

		Firebase.firestore()
			.collection('categories')
			.add({
				id: newCat.id,
				text: newCat.text,
				value: newCat.value
			})
			.then(() => {
				setText('');
				setActive(false);
				toggleCatAdded(true);
			});
	};

	return (
		<React.Fragment>
			<h3 id="catTitle">Select Category</h3>
			<div className="restCat">
				<label>Category</label>
				<select
					value={selectedCategory}
					onChange={(e) => {
						toggleCatAdded(false);
						selectCategory(+e.target.value);
						changeCurrPage(1);
					}}
				>
					{categories
						.sort((a, b) => (a.text.toUpperCase() > b.text.toUpperCase() ? 1 : -1))
						.map((category) => <Category key={category.id} category={category} />)}
				</select>
				<form id="htmlFormCat" className="restCat" onSubmit={onSubmit}>
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
			</div>
		</React.Fragment>
	);
};
