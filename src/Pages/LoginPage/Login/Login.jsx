import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../../Hooks/useForm';
import { GlobalContext } from '../../../Context/GlobalContext';
import CustomInput from '../../../Components/Form/CustomInput/CustomInput';
import { ReactComponent as LoginIcon } from '../../../Assets/icons/loginIcon.svg';
import { ReactComponent as FacebookIcon } from '../../../Assets/icons/facebook-svgrepo-com.svg';
import { ReactComponent as GoogleIcon } from '../../../Assets/icons/google-178-svgrepo-com.svg';
import Loading from '../../../Components/Loading/Loading';

const Login = () => {
	const email = useForm('email');
	const password = useForm('password');

	const { userLogin, error, loading } = React.useContext(GlobalContext);

	const handleSubmit = (event) => {
		event.preventDefault();

		userLogin(email.value, password.value);
	};

	if (loading) return <Loading />;
	return (
		<div className="loginContainer">
			<div className="loginBox">
				<h1>Fazer Login</h1>
				<div className="loginForm">
					<form onSubmit={handleSubmit}>
						<CustomInput
							placeHolder="E-mail ou CPF"
							name="email"
							type="text"
							{...email}
						/>
						<CustomInput
							placeHolder="Senha"
							name="password"
							type="password"
							{...password}
						/>

						{!loading ? (
							<button>
								<LoginIcon />
								Entrar
							</button>
						) : (
							<button disabled>
								<LoginIcon />
								Entrando...
							</button>
						)}
					</form>
					<span>Esqueceu a senha?</span>

					{error ? (
						<div className="loginError">
							<p>{error}</p>
						</div>
					) : null}
				</div>
				<div className="loginOther">
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
					Novo no MetaBum!?{' '}
					<Link to="signup">
						<span>Cadastre-se</span>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
