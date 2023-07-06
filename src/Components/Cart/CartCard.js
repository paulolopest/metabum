import React from 'react';
import { CartContext } from '../../Context/CartContext';
import CustomInput from './../Form/CustomInput/CustomInput';
import useForm from './../../Hooks/useForm';

const CartCard = ({ product }) => {
	const { deleteProduct, editQuantity } = React.useContext(CartContext);
	const quantityInput = useForm('quantity');

	const onClickRemove = () => {
		deleteProduct(product.product_id);
	};

	const onClickAdd = () => {
		const body = {
			quantity: product.quantity + 1,
		};
		editQuantity(product.product_id, body);
	};

	const onClickDecrease = () => {
		if (product.quantity <= 1) {
			return null;
		}
		const body = {
			quantity: product.quantity - 1,
		};
		editQuantity(product.product_id, body);
	};

	const onBlurEditQuantity = ({ target }) => {
		const body = {
			quantity: target.value,
		};
		if (!body.quantity) {
			return null;
		}
		editQuantity(product.product_id, body);
	};

	return (
		<div style={{ border: '1px solid black' }}>
			<h3>{product.product_name}</h3>
			<p>{product.product_price}</p>
			<div style={{ display: 'flex', gap: '0 1rem' }}>
				<button onClick={onClickDecrease}>- 1</button>
				<input
					type="number"
					defaultValue={product.quantity}
					onBlur={onBlurEditQuantity}
				/>
				<button onClick={onClickAdd}>+1</button>
			</div>
			<button onClick={onClickRemove}>X</button>
		</div>
	);
};

export default CartCard;
