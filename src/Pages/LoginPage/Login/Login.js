import React from 'react';
import useForm from './../../../Hooks/useForm';
import CustomInput from './../../../Components/Form/CustomInput/CustomInput';
import CustomButton from './../../../Components/Form/CustomButton/CustomButton';
import { GlobalContext } from '../../../Context/GlobalContext';

const Login = () => {
	const email = useForm('email');
	const password = useForm('password');

	const { userLogin } = React.useContext(GlobalContext);

	const handleSubmit = (event) => {
		event.preventDefault();

		userLogin(email.value, password.value);
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<CustomInput label="Email" name="email" type="text" {...email} />
				<CustomInput
					label="Password"
					name="password"
					type="password"
					{...password}
				/>

				<CustomButton>Send</CustomButton>
			</form>
		</div>
	);
};

export default Login;
