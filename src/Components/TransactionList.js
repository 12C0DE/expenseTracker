import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import { ViewSelect } from '../Components/ViewSelect';
import { Transaction } from './Transaction';
import { TransLIhead } from './TransLIhead';
import { TransLIToggleHead } from './TransLIToggleHead';
import Firebase from '../Firebase/Firebase';

export const TransactionList = () => {
	const { viewAmount, currPage, changeCurrPage } = useContext(GlobalContext);
	const [ sortDate, setSortDate ] = useState(true);
	const [ sortDesc, setSortDesc ] = useState(true);
	const orderByField = sortDate ? 'timeStmp' : 'amount';
	const order = sortDesc ? 'desc' : 'asc';
	const transactions = GetTransactions();
	const lastPostIndex = currPage * viewAmount;
	const firstPostIndex = lastPostIndex - viewAmount;
	let transCount = lastPostIndex > transactions.length ? transactions.length : lastPostIndex;
	const currTrans =
		currPage === 1 ? transactions.slice(0, viewAmount) : transactions.slice(firstPostIndex, lastPostIndex);

	function PrevCurrPage() {
		if (currPage > 1) {
			changeCurrPage(currPage - 1);
			transCount = lastPostIndex;
		}
	}

	function NextCurrPage() {
		if (transactions.length > currPage * viewAmount) {
			changeCurrPage(currPage + 1);
		}
	}

	function GetTransactions() {
		const [ transactions, setTransactions ] = useState([]);
		const { selectedCategory, toggleSwitch } = useContext(GlobalContext);
		const viewAmt = viewAmount;
		const currPg = currPage;
		const sortDt = sortDate;
		const sortDA = sortDesc;

		useEffect(
			() => {
				console.log('get trans');
				Firebase.firestore()
					.collection('transactions')
					.where('catID', '==', selectedCategory)
					.orderBy(orderByField, order)
					.onSnapshot((dt) => {
						const tran = dt.docs.filter((doc) => doc.data).map((doc) => ({
							id: doc.id,
							...doc.data()
						}));
						setTransactions(tran);
					});
			},
			[ selectedCategory, viewAmt, currPg, sortDt, sortDA, toggleSwitch ]
		);
		return transactions;
	}

	function useWindowWidth() {
		const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

		useEffect(() => {
			function handleResize() {
				setWindowWidth(window.innerWidth);
			}

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);
		return windowWidth;
	}

	const toggleSortDate = (e) => {
		e.preventDefault();
		setSortDate(!sortDate);
	};

	const toggleOrder = (e) => {
		e.preventDefault();
		setSortDesc(!sortDesc);
	};

	const breakpoint = 769;
	const widthSize = useWindowWidth();

	const transHeader = widthSize < breakpoint ? <TransLIToggleHead /> : <TransLIhead />;

	const viewCount =
		transCount > 0 ? (
			<span id="viewCount">
				<i>
					{firstPostIndex + 1}-{transCount}
				</i>
			</span>
		) : null;

	return (
		<React.Fragment>
			<h3 id="history">History</h3>
			<div id="viewDiv">
				<ViewSelect />
				{viewCount}
			</div>
			<button
				id="prevBtn"
				className="btn"
				style={{ height: '40px', marginTop: '25px', backgroundColor: 'white', color: 'black' }}
				onClick={PrevCurrPage}
			>
				Prev {viewAmount}
			</button>
			<button
				id="nextBtn"
				className="btn"
				style={{ height: '40px', marginTop: '25px', backgroundColor: 'white', color: 'black' }}
				onClick={NextCurrPage}
			>
				Next {viewAmount}
			</button>
			<div id="sortBox">
				<div id="sortBy">
					<label style={{ paddingRight: '10px' }}>Sort By:</label>
					<input type="radio" name="radio1" checked={sortDate} onChange={toggleSortDate} />
					<label style={{ paddingRight: '5px', paddingLeft: '3px' }}>Date</label>
					<input type="radio" name="radio2" checked={!sortDate} onChange={toggleSortDate} />
					<label style={{ paddingLeft: '3px' }}>Amount</label>
				</div>
				<div id="sortOrd">
					<label style={{ paddingRight: '10px' }}>Order:</label>
					<input type="radio" name="radioDesc" checked={sortDesc} onChange={toggleOrder} />
					<label style={{ paddingRight: '5px', paddingLeft: '3px' }}>Desc</label>
					<input type="radio" name="radioAsc" checked={!sortDesc} onChange={toggleOrder} />
					<label style={{ paddingLeft: '3px' }}>Asc</label>
				</div>
			</div>
			<ul id="transList" className="list">
				{transHeader}
				{currTrans.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
			</ul>
		</React.Fragment>
	);
};
