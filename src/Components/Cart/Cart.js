import React from 'react';
import useAxios from './../../Hooks/useAxios';
import { GlobalContext } from './../../Context/GlobalContext';
import { CartRequest } from './../../Requests/CartRequest';
import CartCard from './CartCard';

const Cart = () => {
	const { get, data, error } = useAxios();
	const cartRequest = new CartRequest();
	const { token } = React.useContext(GlobalContext);

	React.useEffect(() => {
		const { url, headers } = cartRequest.GET_PRODUCTS(token);

		get(url, { headers });

		console.log(data);
	}, []);

	const cartMap = data?.map((product) => (
		<CartCard key={product.product_id} product={product} />
	));

	return <div>{cartMap}</div>;
};

export default Cart;
