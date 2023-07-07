import React from 'react';
import { CartContext } from '../../Context/CartContext';
import CustomButton from '../Form/CustomButton/CustomButton';
import CustomInput from './../Form/CustomInput/CustomInput';
import { ReactComponent as NextIcon } from '../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as PreviousIcon } from '../../Assets/icons/previous-svgrepo-com.svg';
import useForm from './../../Hooks/useForm';
import { limitText } from './../../Utils/Functions';

const CartCard = ({ product }) => {
	const { deleteProduct, editQuantity } = React.useContext(CartContext);
	const [editInput, setEditInput] = React.useState(false);

	const inputQuantity = useForm('');

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

	const handleChange = async ({ target }) => {
		const body = {
			quantity: target.value,
		};
		if (!body.quantity) {
			return null;
		}
		await editQuantity(product.product_id, body);
		setEditInput(false);
	};

	const switchInput = (event) => {
		if (event.target === event.currentTarget) {
			setEditInput(true);
		}
	};

	return (
		<div className="cartCard">
			<p>{limitText(product.product_name)}</p>
			<div className="CC-Info">
				<div>
					<div className="CC-Quantity">
						<CustomButton onClick={onClickDecrease}>
							<PreviousIcon />
						</CustomButton>
						{editInput ? (
							<CustomInput
								type="number"
								value={product.quantity}
								onBlur={handleChange}
								{...inputQuantity}
							/>
						) : (
							<p onClick={switchInput}>{product.quantity}</p>
						)}
						<CustomButton onClick={onClickAdd}>
							<NextIcon />
						</CustomButton>
					</div>
					<CustomButton onClick={onClickRemove}>Remove</CustomButton>
				</div>

				<div>
					<p>R$: {product.product_price}</p>
				</div>
			</div>
		</div>
	);
};

export default CartCard;
