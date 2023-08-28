import React from 'react';
import AddressCard from './AddressCard';
import UserModal from './UserUpdateModal';
import useAxios from '../../../Hooks/useAxios';
import { formatCPF } from '../../../Utils/Functions';
import { UserRequest } from '../../../Requests/UserRequest';
import { GlobalContext } from '../../../Context/GlobalContext';
import CustomInput from '../../../Components/Form/CustomInput/CustomInput';
import { ReactComponent as ProfileIcon } from '../../../Assets/icons/user.svg';
import { ReactComponent as AddressIcon } from '../../../Assets/icons/address.svg';
import { ReactComponent as DescriptionIcon } from '../../../Assets/icons/description-svgrepo-com.svg';

const UserDataPage = () => {
	const user = React.useContext(GlobalContext);
	const userRequest = new UserRequest();

	const [modal, setModal] = React.useState(false);
	const [inputUpdate, setInputUpdate] = React.useState('');

	const { data, get, deleteAxios, put, putWithoutRes } = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.GET_USER_ADDRESS(token);

		get(url, { headers });
	}, []);

	React.useEffect(() => {
		if (modal) {
			document.body.classList.add('loading');
		} else {
			document.body.classList.remove('loading');
		}
	}, [modal]);

	const handleClickEmail = () => {
		setModal(true);
		setInputUpdate('email');
	};
	const handleClickPassword = () => {
		setModal(true);
		setInputUpdate('password');
	};
	const handleClickAddress = () => {
		setModal(true);
		setInputUpdate('address');
	};

	const deleteAddress = async (id) => {
		const token = window.localStorage.getItem('metabumtoken');

		const { url, headers } = userRequest.DELETE_USER_ADDRESS(token, id);

		await deleteAxios(url, { headers });

		window.location.reload();
	};

	const setDefaultAddress = async (zipCode) => {
		const token = window.localStorage.getItem('metabumtoken');

		const { url, headers } = userRequest.SET_USER_DEFAULT_ADDRESS(
			token,
			zipCode
		);

		await putWithoutRes(url, null, { headers });

		window.location.reload();
	};

	const addressCard = data?.map((card) => (
		<AddressCard
			key={card.id}
			card={card}
			user={user}
			deleteAddress={() => deleteAddress(card?.id)}
			setDefaultAddress={() => setDefaultAddress(card?.zip_code)}
		/>
	));

	if (user.data && data)
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
								</div>
							</div>
							<div className="udd-address">
								<div className="udda-title">
									<div>
										<AddressIcon />
										<p>Endereços</p>
									</div>
									<span onClick={handleClickAddress}>
										Adicionar endereço
									</span>
								</div>

								<div className="udda-addressContainer">
									{addressCard}
								</div>
							</div>
						</div>
					</div>
				</div>

				{modal && (
					<UserModal
						setModal={setModal}
						inputUpdate={inputUpdate}
						setInputUpdate={setInputUpdate}
					/>
				)}
			</>
		);
};

export default UserDataPage;
