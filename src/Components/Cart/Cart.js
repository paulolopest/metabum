import React from 'react';
import useAxios from './../../Hooks/useAxios';
import { GlobalContext } from './../../Context/GlobalContext';
import { CartRequest } from './../../Requests/CartRequest';
import CartCard from './CartCard';

const Cart = () => {
	const { get, deleteAxios, data, error } = useAxios();
	const cartRequest = new CartRequest();
	const { token } = React.useContext(GlobalContext);

	React.useEffect(() => {
		const { url, headers } = cartRequest.GET_PRODUCTS(token);

		get(url, { headers });
	}, []);

	console.log(data ? data : data);
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
