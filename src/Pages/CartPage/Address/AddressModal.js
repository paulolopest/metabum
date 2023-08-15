import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import { UserRequest } from '../../../Requests/UserRequest';
import { ReactComponent as AddressIcon } from '../../../Assets/icons/address.svg';
import { ReactComponent as CloseIcon } from '../../../Assets/icons/close-svgrepo-com.svg';

const AddressModal = ({ setSelectAddressModal }) => {
	const userRequest = new UserRequest();

	const { data, get, putWithoutRes } = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.GET_USER_ADDRESS(token);

		get(url, { headers });
	}, []);

	const handleClick = async (zipCode) => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.SET_USER_DEFAULT_ADDRESS(
			token,
			zipCode
		);

		await putWithoutRes(url, null, { headers });

		window.location.reload();
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setSelectAddressModal(false);
		}
	};

	const addressMap = data?.map((ad) => (
		<div
			onClick={() => handleClick(ad.zip_code)}
			key={ad.id}
			className="ci_address-card"
		>
			<div className="address-card-fc">
				<strong>{ad.identification}</strong>
				<p>
					{ad.street}, {ad.complement}
				</p>
				<p>
					Número: {ad.number}, {ad.reference}
				</p>
				<p>
					CEP: {ad.zip_code} - {ad.city}, {ad.uf}
				</p>
			</div>
		</div>
	));

	return (
		<div onClick={onClickOutside} className="s-addressPage">
			<div className="s-addressModal">
				<div className="sam-title">
					<div>
						<AddressIcon />
						Selecione o seu endereço
					</div>

					<CloseIcon onClick={() => setSelectAddressModal(false)} />
				</div>

				{addressMap}
			</div>
		</div>
	);
};

export default AddressModal;
