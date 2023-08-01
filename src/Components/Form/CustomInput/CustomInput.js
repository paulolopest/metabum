import React from 'react';

const CustomInput = ({
	label,
	type,
	name,
	value,
	defaultValue,
	setValue,
	onChange,
	error,
	onBlur,
	className,
	placeHolder,
	disabled,
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
				defaultValue={defaultValue}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeHolder}
				disabled={disabled}
			/>

			{error && <p>{error}</p>}
		</div>
	);
};

export default CustomInput;
