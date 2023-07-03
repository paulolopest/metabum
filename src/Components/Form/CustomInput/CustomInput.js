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
	className,
	placeHolder,
}) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				className={className}
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeHolder}
			/>

			{error && <p>{error}</p>}
		</div>
	);
};

export default CustomInput;
