import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const ViewSelect = () => {
	const viewNums = [ 5, 10, 20, 50, 100 ];
	const { viewAmount, changeViewAmount, changeCurrPage } = useContext(GlobalContext);

	return (
		<div id="viewSelect">
			<span>View:</span>
			<select
				defaultValue={viewAmount}
				onChange={(e) => {
					changeViewAmount(+e.target.value);
					changeCurrPage(1);
				}}
			>
				{viewNums.map((num) => (
					<option key={num} value={num}>
						{num}
					</option>
				))};
			</select>
		</div>
	);
};
