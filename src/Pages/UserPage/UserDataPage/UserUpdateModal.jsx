import React from 'react';
import useForm from '../../../Hooks/useForm';
import useAxios from '../../../Hooks/useAxios';
import { UserRequest } from '../../../Requests/UserRequest';
import CustomInput from '../../../Components/Form/CustomInput/CustomInput';
import { ReactComponent as EmailIcon } from '../../../Assets/icons/email.svg';
import { ReactComponent as LockIcon } from '../../../Assets/icons/lockIcon.svg';
import { ReactComponent as CloseIcon } from '../../../Assets/icons/close-svgrepo-com.svg';
import useMedia from '../../../Hooks/useMedia';

const UserUpdateModal = ({ inputUpdate, setModal, setInputUpdate }) => {
	let { data, put, putWithoutRes, post, error, loading } = useAxios();

	const mobileScreen = useMedia('(max-width: 600px)');

	const userRequest = new UserRequest();

	const uf = useForm('uf');
	const city = useForm('city');
	const email = useForm('email');
	const street = useForm('street');
	const number = useForm('number');
	const newEmail = useForm('email');
	const zipCode = useForm('zipCode');
	const password = useForm('password');
	const reference = useForm('reference');
	const newPassword = useForm('password');
	const complement = useForm('complement');
	const neighborhood = useForm('neighborhood');
	const identification = useForm('identification');

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

	const addAddress = async () => {
		const token = window.localStorage.getItem('metabumtoken');
		const body = {
			zipCode: zipCode.value,
			identification: identification.value,
			street: street.value,
			number: number.value,
			complement: complement.value,
			reference: reference.value,
			neighborhood: neighborhood.value,
			city: city.value,
			uf: uf.value,
		};

		const { url, headers } = userRequest.ADD_USER_ADDRESS(token);

		await post(url, body, { headers });

		const setDefaultAddress = async (zipCode) => {
			const { url, headers } = userRequest.SET_USER_DEFAULT_ADDRESS(
				token,
				zipCode
			);

			putWithoutRes(url, null, { headers });
		};

		await setDefaultAddress(body.zipCode);

		// window.location.reload();
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setModal(false);
			setInputUpdate('');
		}
	};

	const types = {
		email: {
			name: 'E-mail',
			icon: <EmailIcon />,
			inputs: (
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
			),
			function: () => updateEmail(),
		},
		password: {
			name: 'Senha',
			icon: <LockIcon />,
			inputs: (
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
			),
			function: () => updatePassword(),
		},
		address: {
			name: 'Endereço',
			icon: '',
			inputs: (
				<>
					<CustomInput
						name="zipCode"
						type="zipCode"
						placeHolder="CEP"
						{...zipCode}
					/>
					<CustomInput
						name="identification"
						type="identification"
						placeHolder="Nome do endereço"
						{...identification}
					/>
					<CustomInput
						name="street"
						type="street"
						placeHolder="Logradouro"
						{...street}
					/>
					<CustomInput
						name="number"
						type="number"
						placeHolder="Número"
						{...number}
					/>
					<CustomInput
						name="complement"
						type="complement"
						placeHolder="Complemento"
						{...complement}
					/>
					<CustomInput
						name="reference"
						type="reference"
						placeHolder="Referência"
						{...reference}
					/>
					<CustomInput
						name="neighborhood"
						type="neighborhood"
						placeHolder="Bairro"
						{...neighborhood}
					/>
					<CustomInput
						name="city"
						type="city"
						placeHolder="Cidade"
						{...city}
					/>
					<CustomInput name="uf" type="uf" placeHolder="Estado" {...uf} />
				</>
			),
			function: () => addAddress(),
		},
	};

	return (
		<div onClick={onClickOutside} className="uds-modalContainer">
			<div className="uds-modalSection">
				<div className="uds-ms-title">
					{types[inputUpdate].icon}
					<p>
						{inputUpdate === 'address' ? 'Adicionar' : 'Alterar'}{' '}
						{types[inputUpdate].name}
					</p>

					{mobileScreen && <CloseIcon onClick={() => setModal(false)} />}
				</div>
				<p>Preencha os campos abaixo para realizar a alteração</p>
				<form
					onSubmit={(e) => e.preventDefault()}
					className="uds-ms-inputs"
				>
					{types[inputUpdate].inputs}
				</form>

				<div className="uds-ms-reqResponse">
					<div className="rr-200">{data && <span>{data}</span>}</div>
					<div className="rr-error">{error && <span>{error}</span>}</div>
				</div>

				<button
					disabled={loading ? true : false}
					onClick={types[inputUpdate].function}
				>
					{loading ? 'Alterando...' : 'Continuar'}
				</button>
			</div>
		</div>
	);
};

export default UserUpdateModal;
