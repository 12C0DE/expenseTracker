import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const Category = ({ category }) => {
	return <option value={category.value}>{category.text}</option>;
};
