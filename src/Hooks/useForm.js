import React from 'react';

const types = {};

const useForm = (type) => {
	const [value, setValue] = React.useState('');
	const [error, setError] = React.useState(null);

	const validate = (value) => {
		if (types === false) return true;
		if (value.length === 0) {
			setError('Enter a value');
			return false;
		} else if (types[type] && !types[type].regex.test(value)) {
			setError(types[type].message);
			return false;
		} else {
			setError(null);
			return true;
		}
	};

	const onChange = ({ target }) => {
		if (error) validate(target.value);
		setValue(target.value);
	};

	return {
		value,
		setValue,
		error,
		onChange,
		validate: () => validate(value),
		onblur: () => validate(value),
	};
};

export default useForm;
