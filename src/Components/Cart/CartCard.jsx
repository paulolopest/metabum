import React from 'react';
import useForm from '../../Hooks/useForm';
import useMedia from '../../Hooks/useMedia';
import { CartContext } from '../../Context/CartContext';
import CustomInput from '../Form/CustomInput/CustomInput';
import CustomButton from '../Form/CustomButton/CustomButton';
import { formattedPrice, limitText } from '../../Utils/Functions';
import { ReactComponent as NextIcon } from '../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as PreviousIcon } from '../../Assets/icons/previous-svgrepo-com.svg';
import { ReactComponent as TrashIcon } from '../../Assets/icons/trash-3-svgrepo-com.svg';

const CartCard = ({ product }) => {
	const { deleteProduct, editQuantity } = React.useContext(CartContext);
	const [editInput, setEditInput] = React.useState(false);

	const mobileScreen = useMedia('(max-width: 37rem)');
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
			{mobileScreen ? (
				<p>{limitText(product.product_name, 45)}</p>
			) : (
				<p>{limitText(product.product_name, 87)}</p>
			)}
			<div>
				<div className="CC-Info">
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
							<span onClick={switchInput}>{product.quantity}</span>
						)}
						<CustomButton onClick={onClickAdd}>
							<NextIcon />
						</CustomButton>
					</div>
					<p>R$: {formattedPrice(product.product_price)}</p>
				</div>

				<CustomButton className="CC-removeButton" onClick={onClickRemove}>
					<TrashIcon />
					Remover
				</CustomButton>
			</div>
		</div>
	);
};

export default CartCard;
