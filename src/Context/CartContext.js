import React from 'react';
import useAxios from '../Hooks/useAxios';
import { CartRequest } from './../Requests/CartRequest';

export const CartContext = React.createContext();
const cartRequest = new CartRequest();

const CartStorage = ({ children }) => {
	const [cartBar, setCartBar] = React.useState(false);
	const { data, loading, error, post, get, put, deleteAxios, putWithoutRes } =
		useAxios();

	const getCart = React.useCallback(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = cartRequest.GET_PRODUCTS(token);

		get(url, { headers });
	}, [get]);

	const addProduct = React.useCallback(
		async (productId) => {
			const token = window.localStorage.getItem('metabumtoken');
			const { url, headers } = cartRequest.ADD_PRODUCT(productId, token);

			await post(url, null, { headers });
			getCart();
		},
		[post, getCart]
	);

	const deleteProduct = React.useCallback(
		async (productId) => {
			const token = window.localStorage.getItem('metabumtoken');
			const { url, headers } = cartRequest.DELETE_PRODUCT(token, productId);

			await deleteAxios(url, { headers });
			getCart();
		},
		[deleteAxios, getCart]
	);

	const editQuantity = React.useCallback(
		async (productId, body) => {
			const token = window.localStorage.getItem('metabumtoken');
			const { url, headers } = cartRequest.EDIT_QUANTITY(token, productId);

			await putWithoutRes(url, body, { headers });
			getCart();
		},
		[getCart, putWithoutRes]
	);

	const deleteCart = React.useCallback(async () => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = cartRequest.DELETE_CART(token);

		await deleteAxios(url, { headers });
		getCart();
	}, [deleteAxios, getCart]);

	console.log(data);

	return (
		<CartContext.Provider
			value={{
				addProduct,
				getCart,
				deleteProduct,
				editQuantity,
				deleteCart,
				setCartBar,
				cartBar,
				data,
				loading,
				error,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartStorage;
