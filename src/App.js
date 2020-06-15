import React, { useContext } from 'react';
import './App.css';
import { Header } from './Components/Header';
import { Balance } from './Components/Balance';
import { Categories } from './Components/Categories';
import { IncomeExpenses } from './Components/IncomeExpenses';
import { TransactionList } from './Components/TransactionList';
import { AddTransaction } from './Components/AddTransaction';

import { GlobalProvider, GlobalContext } from './Context/GlobalState';

function App() {
	return (
		<GlobalProvider>
			<Header />
			<div className="Container">
				<Categories />
				<Balance />
				<IncomeExpenses />
				<AddTransaction />
				<TransactionList />
			</div>
		</GlobalProvider>
	);
}

export default App;
