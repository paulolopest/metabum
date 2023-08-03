import React from 'react';

const AddressCard = ({ card, user, deleteAddress }) => {
	return (
		<div
			className={
				user?.data.default_address === card.zip_code
					? 'addressCardDefault'
					: 'addressCard'
			}
			key={card.id}
		>
			<div className="ad-fc">
				<div className="ad-fc-title">
					<strong>{card.identification}</strong>
					{user?.data.default_address === card.zip_code ? (
						<p>Padrão</p>
					) : null}
				</div>
				<p>{card.street}</p>
				<p>{card.complement}</p>
				<p>
					CEP: {card.zip_code} - {card.city}, {card.uf}
				</p>
			</div>
			<div>
				<button onClick={deleteAddress} style={{ color: '#b2b2b2' }}>
					Excluir
				</button>

				{user?.data.default_address !== card.zip_code && (
					<button style={{ color: '#ff6500' }}>Deixar como padrão</button>
				)}
			</div>
		</div>
	);
};

export default AddressCard;
