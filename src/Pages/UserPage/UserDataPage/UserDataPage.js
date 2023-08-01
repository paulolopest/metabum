import React from 'react';
import { ReactComponent as ProfileIcon } from '../../../Assets/icons/user.svg';
import { ReactComponent as DescriptionIcon } from '../../../Assets/icons/description-svgrepo-com.svg';
import { ReactComponent as AddressIcon } from '../../../Assets/icons/address.svg';
import CustomInput from './../../../Components/Form/CustomInput/CustomInput';
import { GlobalContext } from './../../../Context/GlobalContext';
import { formatCPF } from './../../../Utils/Functions';
import useAxios from './../../../Hooks/useAxios';
import { UserRequest } from '../../../Requests/UserRequest';

const UserDataPage = () => {
	const user = React.useContext(GlobalContext);

	const userRequest = new UserRequest();

	const { data, get } = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.GET_USER_ADDRESS(token);

		get(url, { headers });
	}, []);

	const addressCard = data?.map((card) => (
		<div className="addressCard" key={card.id}>
			<strong>{card.identification}</strong>
			<p>{card.street}</p>
			<p>{card.complement}</p>
			<p>
				CEP: {card.zip_code} - {card.city}, {card.uf}
			</p>
		</div>
	));

	return (
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
							<button>Alterar E-mail</button>
							<button>Alterar Senha</button>
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

						<div className="udda-addressContainer">{addressCard}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDataPage;
