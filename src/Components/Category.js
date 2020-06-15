import React from 'react';

export const Category = ({ category }) => {
	return <option value={category.value}>{category.text}</option>;
};
