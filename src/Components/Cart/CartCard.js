import React from 'react';
import { CartRequest } from '../../Requests/CartRequest';
import useAxios from '../../Hooks/useAxios';

const cartRequest = new CartRequest();

const CartCard = ({ product }) => {
	const { deleteAxios } = useAxios();
	const onClickRemove = React.useCallback(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = cartRequest.DELETE_PRODUCT(
			token,
			product.product_id
		);

		deleteAxios(url, { headers });
	}, [deleteAxios]);

	return (
		<div style={{ border: '1px solid black' }}>
			<h3>{product.product_name}</h3>
			<p>{product.product_price}</p>
			<p>{product.quantity}</p>
			<button onClick={onClickRemove}>X</button>
		</div>
	);
};

export default CartCard;
