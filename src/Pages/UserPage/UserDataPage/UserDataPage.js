import React from 'react';
import useAxios from './../../../Hooks/useAxios';
import { formatCPF } from './../../../Utils/Functions';
import { UserRequest } from '../../../Requests/UserRequest';
import { GlobalContext } from './../../../Context/GlobalContext';
import CustomInput from './../../../Components/Form/CustomInput/CustomInput';
import { ReactComponent as EmailIcon } from '../../../Assets/icons/email.svg';
import { ReactComponent as ProfileIcon } from '../../../Assets/icons/user.svg';
import { ReactComponent as LockIcon } from '../../../Assets/icons/lockIcon.svg';
import { ReactComponent as AddressIcon } from '../../../Assets/icons/address.svg';
import { ReactComponent as DescriptionIcon } from '../../../Assets/icons/description-svgrepo-com.svg';
import useForm from './../../../Hooks/useForm';

const UserDataPage = () => {
	const user = React.useContext(GlobalContext);
	const userRequest = new UserRequest();

	const [modal, setModal] = React.useState(false);
	const [inputUpdate, setInputUpdate] = React.useState('');

	const email = useForm('email');
	const newEmail = useForm('email');
	const password = useForm('password');
	const newPassword = useForm('password');

	const address = useAxios();

	let { data, put, error, loading } = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.GET_USER_ADDRESS(token);

		address.get(url, { headers });
	}, []);

	React.useEffect(() => {
		if (modal) {
			document.body.classList.add('loading');
		} else {
			document.body.classList.remove('loading');
		}
	}, [modal]);

	const updateEmail = async () => {
		const token = window.localStorage.getItem('metabumtoken');
		const body = {
			currentEmail: email.value,
			newEmail: newEmail.value,
			password: password.value,
		};

		const { url, headers } = userRequest.UPDATE_USER_EMAIL(token);

		put(url, body, { headers });
	};
	const updatePassword = () => {
		const token = window.localStorage.getItem('metabumtoken');
		const body = {
			currentPassword: password.value,
			newPassword: newPassword.value,
		};

		const { url, headers } = userRequest.UPDATE_USER_PASSWORD(token);

		put(url, body, { headers });
	};

	const handleClickEmail = () => {
		setModal(true);
		setInputUpdate('E-mail');
	};
	const handleClickPassword = () => {
		setModal(true);
		setInputUpdate('Senha');
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setModal(false);
			setInputUpdate('');
		}
	};

	const addressCard = address.data?.map((card) => (
		<div className="addressCard" key={card.id}>
			<strong>{card.identification}</strong>
			<p>{card.street}</p>
			<p>{card.complement}</p>
			<p>
				CEP: {card.zip_code} - {card.city}, {card.uf}
			</p>
		</div>
	));

	if (user.data && address.data)
		return (
			<>
				<div className="userDataSection">
					<div className="userDataContainer">
						<div className="ud-title">
							<ProfileIcon />
							<p>Meus dados</p>
						</div>

						<div className="ud-data">
							<div className="udd-info">
								<div className="uddi-title">
									<DescriptionIcon />
									<p>Dados basicos</p>
								</div>

								<div className="uddi-buttons">
									<button onClick={handleClickEmail}>
										Alterar E-mail
									</button>
									<button onClick={handleClickPassword}>
										Alterar Senha
									</button>
								</div>

								<div className="uddi-inputs">
									<CustomInput
										placeHolder={user.data.name}
										label="Nome completo"
									/>
									<CustomInput
										disabled
										placeHolder={user.data.email}
										label="E-mail"
									/>
									<CustomInput
										disabled
										placeHolder={formatCPF(user.data.cpf)}
										label="CPF"
									/>
								</div>
							</div>
							<div className="udd-address">
								<div className="udda-title">
									<AddressIcon />
									<p>Endereços</p>
								</div>

								<div className="udda-addressContainer">
									{addressCard}
								</div>
							</div>
						</div>
					</div>
				</div>

				{modal && (
					<div onClick={onClickOutside} className="uds-modalContainer">
						<div className="uds-modalSection">
							<div className="uds-ms-title">
								{inputUpdate === 'E-mail' ? (
									<EmailIcon />
								) : (
									<LockIcon />
								)}
								<p>Alterar {inputUpdate}</p>
							</div>
							<p>Preencha os campos abaixo para realizar a alteração</p>
							<form
								onSubmit={(e) => e.preventDefault()}
								className="uds-ms-inputs"
							>
								{inputUpdate === 'Senha' ? (
									<>
										<CustomInput
											name="password"
											type="password"
											placeHolder="Digite sua senha atual"
											{...password}
										/>
										<CustomInput
											type="password"
											name="newPassword"
											placeHolder="Digite sua nova senha"
											{...newPassword}
										/>
									</>
								) : (
									<>
										<CustomInput
											name="email"
											type="email"
											placeHolder="Digite seu e-mail atual"
											{...email}
										/>
										<CustomInput
											name="newEmail"
											type="email"
											placeHolder="Digite seu novo e-mail"
											{...newEmail}
										/>
										<CustomInput
											name="password"
											type="password"
											placeHolder="Digite sua senha"
											{...password}
										/>
									</>
								)}
							</form>

							<div className="uds-ms-reqResponse">
								<div className="rr-200">
									{data && <span>{data}</span>}
								</div>
								<div className="rr-error">
									{error && <span>{error}</span>}
								</div>
							</div>

							<button
								disabled={loading ? true : false}
								onClick={
									inputUpdate === 'Senha'
										? updatePassword
										: updateEmail
								}
							>
								{loading ? 'Alterando...' : 'Continuar'}
							</button>
						</div>
					</div>
				)}
			</>
		);
};

export default UserDataPage;
