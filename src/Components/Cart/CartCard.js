import React from 'react';

const CartCard = ({ product }) => {
	return (
		<div>
			<h3>{product.product_name}</h3>
			<p>{product.product_price}</p>
			<p>{product.quantity}</p>
		</div>
	);
};

export default CartCard;
