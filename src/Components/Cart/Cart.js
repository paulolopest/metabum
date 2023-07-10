import React from 'react';
import CartCard from './CartCard';
import { CartContext } from '../../Context/CartContext';
import CustomButton from './../Form/CustomButton/CustomButton';
import { ReactComponent as EmptyCart } from '../../Assets/icons/cart-close-svgrepo-com.svg';
import { formattedPrice } from '../../Utils/Functions';
import { ReactComponent as DotIcon } from '../../Assets/icons/menu-dots-svgrepo-com.svg';

const Cart = () => {
	const [deleteOption, setDeleteOption] = React.useState(false);

	const { getCart, data, deleteCart, cartBar, setCartBar } =
		React.useContext(CartContext);

	React.useEffect(() => {
		getCart();
	}, [getCart]);

	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.keyCode === 27) {
				setCartBar(false);
				setDeleteOption(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setCartBar]);

	React.useEffect(() => {
		const handlePopState = (event) => {
			setCartBar(false);
		};

		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [setCartBar]);

	const cleanCart = () => {
		deleteCart();
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setCartBar(false);
			setDeleteOption(false);
		}
	};

	let totalPrice = 0;
	for (let i = 0; i < data?.length; i++) {
		let item = data[i];
		totalPrice += Number(item.product_price) * Number(item.quantity);
	}

	const cartMap = data?.map((product) => (
		<CartCard key={product.product_id} product={product} />
	));

	return (
		<div
			onClick={onClickOutside}
			className={cartBar ? 'cartContainer' : 'displayNone'}
		>
			{data?.length <= 0 ? (
				<div className="cartEmpty animeRight">
					<div>
						<EmptyCart />
						<p>Your cart is empty</p>
					</div>
				</div>
			) : (
				<div className="cart animeRight">
					<div className="cartHeader">
						<p>Cart: {data?.length} products</p>
						<div>
							<span
								onClick={deleteCart}
								className={deleteOption ? '' : 'displayNone'}
							>
								Delete all cart
							</span>
							<DotIcon onClick={() => setDeleteOption(!deleteOption)} />
						</div>
					</div>
					<div className="cartMain">{cartMap}</div>
					<div className="cartFooter">
						<div>
							<span>
								In cash via <strong>pix</strong>
							</span>
							<p>R$ {formattedPrice(totalPrice - totalPrice / 10)}</p>
							<span>Save: R$ {formattedPrice(totalPrice / 10)}</span>
						</div>
						<CustomButton>Choose payment method</CustomButton>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
