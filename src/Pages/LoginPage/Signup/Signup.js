import React from 'react';
import useForm from '../../../Hooks/useForm';
import { USER_SIGNUP } from '../../../Requests/UserRequest';
import useAxios from './../../../Hooks/useAxios';
import CustomInput from '../../../Components/Form/CustomInput/CustomInput';
import CustomButton from '../../../Components/Form/CustomButton/CustomButton';
import { GlobalContext } from '../../../Context/GlobalContext';
import Loading from './../../../Components/Loading/Loading';
import { UserRequest } from './../../../Requests/UserRequest';

const userRequest = new UserRequest();

const Signup = () => {
	const name = useForm('name');
	const email = useForm('email');
	const password = useForm('password');
	const cpf = useForm('cpf');

	const { post, error, loading } = useAxios();
	const { userLogin } = React.useContext(GlobalContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const body = {
			name: name.value,
			email: email.value,
			password: password.value,
			cpf: cpf.value,
		};

		const { url } = userRequest.USER_SIGNUP(body);

		await post(url, body);

		userLogin(email.value, password.value);
	};

	return (
		<div>
			{loading && <Loading />}
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<CustomInput label="Name" name="name" type="text" {...name} />
				<CustomInput label="Email" name="email" type="text" {...email} />
				<CustomInput
					label="Password"
					name="password"
					type="text"
					{...password}
				/>
				<CustomInput label="CPF" name="cpf" type="text" {...cpf} />
				<CustomButton>Register</CustomButton>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default Signup;
