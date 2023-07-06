import React from 'react';
import CartCard from './CartCard';
import { CartContext } from '../../Context/CartContext';

const Cart = () => {
	const { getCart, data, deleteCart } = React.useContext(CartContext);

	React.useEffect(() => {
		getCart();
	}, [getCart]);

	const cleanCart = () => {
		deleteCart();
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
		<div>
			{data?.length <= 0 ? (
				<p>Empty cart</p>
			) : (
				<div>
					{cartMap}
					<div>
						<p>Total Price: {totalPrice}</p>
						<button onClick={cleanCart}>Clean Cart</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
