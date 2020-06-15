import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
	transactions: [],
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
	]
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(AppReducer, initialState);

	//Actions
	function delTransaction(id) {
		dispatch({
			type: 'DEL_TRANS',
			payload: id
		});
	}

	function addTransaction(transaction) {
		dispatch({
			type: 'ADD_TRANS',
			payload: transaction
		});
	}

	return (
		<GlobalContext.Provider
			value={{ transactions: state.transactions, categories: state.categories, delTransaction, addTransaction }}
		>
			{children}
		</GlobalContext.Provider>
	);
};
