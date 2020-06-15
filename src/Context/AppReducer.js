export default (state, action) => {
	switch (action.type) {
		case 'DEL_TRANS':
			return {
				...state,
				transactions: state.transactions.filter((transaction) => transaction.id !== action.payload)
			};
		case 'ADD_TRANS':
			return {
				...state,
				transactions: [ action.payload, ...state.transactions ]
			};
		case 'ADD_CAT':
			return {
				...state,
				categories: [ action.payload, ...state.categories ]
			};
		case 'SEL_CAT':
			return {
				...state,
				selectedCategory: action.payload
			};
		default:
			return state;
	}
};
