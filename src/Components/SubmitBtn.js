import React from 'react';

export const SubmitBtn = (props) => {
	let btnStyle = 'btn';
	btnStyle += !props.active ? ' disabled' : '';

	return (
		<button className={btnStyle} disabled={!props.active}>
			{props.text}
		</button>
	);
};
