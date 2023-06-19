import React from 'react';
import CustomInput from '../../Components/Form/CustomInput/CustomInput';
import CustomButton from './../../Components/Form/CustomButton/CustomButton';
import { GlobalContext } from '../../Context/GlobalContext';
import useForm from './../../Hooks/useForm';
import { USER_LOGIN } from '../../Requests/UserRequest';
import useAxios from '../../Hooks/useAxios';

const LoginPage = () => {
	const email = useForm('email');
	const password = useForm('password');

	const { userLogin } = React.useContext(GlobalContext);

	const handleSubmit = (event) => {
		event.preventDefault();

		userLogin(email.value, password.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<CustomInput label="email" type="text" name="email" {...email} />
			<CustomInput
				label="password"
				type="password"
				name="password"
				{...password}
			/>
			<CustomButton>Send</CustomButton>
		</form>
	);
};

export default LoginPage;
