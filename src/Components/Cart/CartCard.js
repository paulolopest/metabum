import React from 'react';
import { CartContext } from '../../Context/CartContext';

const CartCard = ({ product }) => {
	const { deleteProduct, editQuantity } = React.useContext(CartContext);

	const onClickRemove = React.useCallback(() => {
		deleteProduct(product.product_id);
	}, [deleteProduct, product.product_id]);

	const onClickAdd = React.useCallback(() => {
		const body = {
			quantity: product.quantity + 1,
		};
		editQuantity(product.product_id, body);
	}, [editQuantity, product.product_id, product.quantity]);

	const onClickDecrease = React.useCallback(() => {
		if (product.quantity <= 1) {
			return null;
		}
		const body = {
			quantity: product.quantity - 1,
		};
		editQuantity(product.product_id, body);
	}, [editQuantity, product.product_id, product.quantity]);

	return (
		<div style={{ border: '1px solid black' }}>
			<h3>{product.product_name}</h3>
			<p>{product.product_price}</p>
			<div style={{ display: 'flex', gap: '0 1rem' }}>
				<button onClick={onClickDecrease}>- 1</button>
				<p>{product.quantity}</p>
				<button onClick={onClickAdd}>+1</button>
			</div>
			<button onClick={onClickRemove}>X</button>
		</div>
	);
};

export default CartCard;
