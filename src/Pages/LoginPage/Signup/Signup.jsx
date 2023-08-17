import React from 'react';
import useForm from '../../../Hooks/useForm';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Components/Loading/Loading';
import { UserRequest } from '../../../Requests/UserRequest';
import { GlobalContext } from '../../../Context/GlobalContext';
import CustomInput from '../../../Components/Form/CustomInput/CustomInput';
import CustomButton from '../../../Components/Form/CustomButton/CustomButton';
import { ReactComponent as FacebookIcon } from '../../../Assets/icons/facebook-svgrepo-com.svg';
import { ReactComponent as GoogleIcon } from '../../../Assets/icons/google-178-svgrepo-com.svg';
import { Link } from 'react-router-dom';

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
		<div className="signupContainer">
			<div className="signupBox">
				<h1>Criar Conta</h1>
				<div className="signupForm">
					<form onSubmit={handleSubmit}>
						<CustomInput
							placeHolder="Name"
							name="name"
							type="text"
							{...name}
						/>
						<CustomInput
							placeHolder="Email"
							name="email"
							type="text"
							{...email}
						/>
						<CustomInput
							placeHolder="Password"
							name="password"
							type="text"
							{...password}
						/>
						<CustomInput
							placeHolder="CPF"
							name="cpf"
							type="text"
							{...cpf}
						/>
						{!loading ? (
							<CustomButton>Continuar</CustomButton>
						) : (
							<CustomButton>Cadastrando...</CustomButton>
						)}

						{error ? (
							<div className="signupError">
								<p>{error}</p>
							</div>
						) : null}
					</form>
				</div>

				<div className="signupOther">
					<p>Quero acessar com minhas redes sociais</p>
					<div>
						<button>
							<FacebookIcon />
							Facebook
						</button>
						<button className="googleButton">
							<GoogleIcon />
							Google
						</button>
					</div>
				</div>
				<p>
					Já tem uma conta!?{' '}
					<Link to="/login">
						<span>Faça o login</span>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
