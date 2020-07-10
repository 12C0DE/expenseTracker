import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalState';

export const ViewSelect = () => {
	const viewNums = [ 5, 10, 20, 50, 100 ];
	const { viewAmount, changeViewAmount } = useContext(GlobalContext);

	return (
		<select
			defaultValue={viewAmount}
			onChange={(e) => {
				changeViewAmount(+e.target.value);
			}}
		>
			{viewNums.map((num) => <option value={num}>{num}</option>)};
		</select>
	);
};
