import React from 'react';

const CustomInput = ({
	label,
	type,
	name,
	value,
	setValue,
	onChange,
	error,
	onBlur,
}) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>

			{error && <p>{error}</p>}
		</div>
	);
};

export default CustomInput;
