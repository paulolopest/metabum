import React from 'react';
import CartCard from './CartCard';
import { CartContext } from '../../Context/CartContext';

const Cart = () => {
	const { getCart, data, loading } = React.useContext(CartContext);

	React.useEffect(() => {
		getCart();
	}, [getCart]);

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
			{cartMap}
			Total Price: {totalPrice}
		</div>
	);
};

export default Cart;
