import React from 'react';

export default function cellData(props: any) {
	const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

	const buttonClicked = () => {
		alert(`${cellValue} medals won!`);
	};

	return (
		<span>
			<span>{cellValue}</span>&nbsp;
			<button onClick={() => buttonClicked()}>Push For Total</button>
		</span>
	);
};