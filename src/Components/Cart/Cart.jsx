import React from 'react';
import CartCard from './CartCard';
import { CartContext } from '../../Context/CartContext';
import CustomButton from '../Form/CustomButton/CustomButton';
import { ReactComponent as EmptyCart } from '../../Assets/icons/cart-close-svgrepo-com.svg';
import { ReactComponent as CloseIcon } from '../../Assets/icons/close-svgrepo-com.svg';
import { formattedPrice } from '../../Utils/Functions';
import { ReactComponent as DotIcon } from '../../Assets/icons/menu-dots-svgrepo-com.svg';
import { GlobalContext } from '../../Context/GlobalContext';
import useMedia from '../../Hooks/useMedia';
import Loading from './../Loading/Loading';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const [deleteOption, setDeleteOption] = React.useState(false);
	const { login } = React.useContext(GlobalContext);

	const mobileScreen = useMedia('(max-width: 37rem)');
	const navigate = useNavigate();

	const { getCart, data, deleteCart, cartBar, setCartBar, loading } =
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

	const cleanCart = () => {
		deleteCart();
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setCartBar(false);
			setDeleteOption(false);
		}
	};

	const goToCartPage = () => {
		setCartBar(false);
		navigate('/cart');
	};

	let totalPrice = 0;
	for (let i = 0; i < data?.length; i++) {
		let item = data[i];
		totalPrice += Number(item.product_price) * Number(item.quantity);
	}

	const cartMap = data?.map((product) => (
		<CartCard key={product.product_id} product={product} />
	));

	if (data)
		return (
			<div
				onClick={onClickOutside}
				className={cartBar ? 'cartContainer' : 'displayNone'}
			>
				{data?.length <= 0 || !login ? (
					<div className="cartEmpty animeRight">
						<div>
							<EmptyCart />
							<p>Carrinho vazio</p>
						</div>
					</div>
				) : (
					<div className="cart animeRight">
						<div className="cartHeader">
							<p>
								<strong>Carrinho</strong>
							</p>
							{mobileScreen ? (
								<CustomButton
									className="mobileCloseIcon"
									onClick={() => setCartBar(false)}
								>
									<CloseIcon />
								</CustomButton>
							) : (
								<div>
									<span
										onClick={deleteCart}
										className={deleteOption ? '' : 'displayNone'}
									>
										Excluir tudo
									</span>
									<DotIcon
										onClick={() => setDeleteOption(!deleteOption)}
									/>
								</div>
							)}
						</div>
						<div className="cartMain">{cartMap}</div>
						<div className="cartFooter">
							<div>
								<span>
									Valor à vista no <strong>Pix</strong>
								</span>
								<p>R$ {formattedPrice(totalPrice - totalPrice / 10)}</p>
								<span>
									(Economize:{' '}
									<strong>R$ {formattedPrice(totalPrice / 10)}</strong>
									)
								</span>
							</div>
							<button onClick={goToCartPage}>Ir para o pagamento</button>
						</div>
					</div>
				)}
			</div>
		);
};

export default Cart;
