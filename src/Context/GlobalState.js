import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import Firebase from '../Firebase/Firebase';

//Initial State
const initialState = {
	transactions: [
		{
			amount: 34,
			catID: 1,
			id: 1,
			text: 'fd',
			transDate: '2018/8/5'
		},
		{
			amount: 634,
			catID: 2,
			id: 2,
			text: 'hgh',
			transDate: '2018/8/5'
		},
		{
			amount: 734,
			catID: 2,
			id: 3,
			text: 'ghj',
			transDate: '2018/8/5'
		}
	],
	categories: [
		{
			id: 1,
			value: 1,
			text: 'fss'
		},
		{
			id: 2,
			value: 2,
			text: 'gdss'
		},
		{
			id: 3,
			value: 3,
			text: 'gvbv'
		}
	],
	selectedCategory: 1,
	showCategoryAdded: false,
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

	function delTransaction(id) {
		dispatch({
			type: 'DEL_TRANS',
			payload: id
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
				delTransaction,
				addTransaction,
				addCategory,
				selectCategory,
				toggleCatAdded,
				todayDate: state.todayDate
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
