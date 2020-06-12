import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//Initial State
const initialState = {
	transactions: []
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
		<GlobalContext.Provider value={{ transactions: state.transactions, delTransaction, addTransaction }}>
			{children}
		</GlobalContext.Provider>
	);
};
