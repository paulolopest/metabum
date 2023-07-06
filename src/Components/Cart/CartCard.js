import React from 'react';
import { CartContext } from '../../Context/CartContext';

const CartCard = ({ product }) => {
	const { deleteProduct, editQuantity } = React.useContext(CartContext);
	const [quantityInput, setQuantityInput] = React.useState(1);

	const onClickRemove = () => {
		deleteProduct(product.product_id);
	};

	const onClickAdd = () => {
		setQuantityInput(Number(quantityInput) + 1);

		const body = {
			quantity: quantityInput,
		};
		editQuantity(product.product_id, body);
	};

	const onClickDecrease = () => {
		if (quantityInput <= 1) {
			return null;
		}

		setQuantityInput(Number(quantityInput) - 1);

		const body = {
			quantity: quantityInput,
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

	const handleChange = ({ target }) => {
		setQuantityInput(target.value);
	};

	return (
		<div className="cartCard">
			<h3>{product.product_name}</h3>
			<p>{product.product_price}</p>
			<div>
				<button onClick={onClickDecrease}>- 1</button>
				<input
					type="number"
					value={quantityInput}
					onBlur={onBlurEditQuantity}
					onChange={handleChange}
				/>
				<button onClick={onClickAdd}>+1</button>
				<button onClick={onClickRemove}>X</button>
			</div>
		</div>
	);
};

export default CartCard;
