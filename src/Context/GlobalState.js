import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
	transactions: [],
	categories: [],
	selectedCategory: 1,
	showCategoryAdded: false,
	viewAmount: 10,
	todayDate: new Date().toLocaleDateString()
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(AppReducer, initialState);

	//Actions
	function addTransaction(transaction) {
		dispatch({
			type: 'ADD_TRANS',
			payload: transaction
		});
	}

	function addCategory(category) {
		dispatch({
			type: 'ADD_CAT',
			payload: category
		});
	}

	function selectCategory(categoryID) {
		dispatch({
			type: 'SEL_CAT',
			payload: categoryID
		});
	}

	function changeViewAmount(amount) {
		dispatch({
			type: 'CHANGE_VIEW',
			payload: amount
		});
	}

	function toggleCatAdded(isVisible) {
		dispatch({
			type: 'SHOW_CAT',
			payload: isVisible
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				categories: state.categories,
				selectedCategory: state.selectedCategory,
				showCategoryAdded: state.showCategoryAdded,
				viewAmount: state.viewAmount,
				addTransaction,
				addCategory,
				selectCategory,
				changeViewAmount,
				toggleCatAdded,
				todayDate: state.todayDate
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
