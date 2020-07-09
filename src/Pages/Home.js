import React from 'react';
import { Header } from '../Components/Header';
import { Balance } from '../Components/Balance';
import { Categories } from '../Components/Categories';
import { IncomeExpenses } from '../Components/IncomeExpenses';
import { TransactionList } from '../Components/TransactionList';
import { AddTransaction } from '../Components/AddTransaction';

export const Home = () => {
	return (
		<React.Fragment>
			<Header />
			<div className="container">
				<Categories />
				<Balance />
				<IncomeExpenses />
				<AddTransaction />
				<TransactionList />
			</div>
		</React.Fragment>
	);
};
