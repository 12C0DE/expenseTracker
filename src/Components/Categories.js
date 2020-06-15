import React, { useContext } from 'react';
import { Category } from './Category';
import { GlobalContext } from '../Context/GlobalState';

export const Categories = ({ category }) => {
	const { categories } = useContext(GlobalContext);

	return (
		<React.Fragment>
			<h3>Select Category</h3>
			<select>{categories.map((category) => <Category key={category.id} category={category} />)}</select>
		</React.Fragment>
	);
};
