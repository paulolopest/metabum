const BASE_URL = 'https://back-metabum.vercel.app';

export class CartRequest {
	ADD_PRODUCT = (id, token) => {
		return {
			url: `${BASE_URL}/cart/add/${id}`,
			headers: {
				Authorization: token,
			},
		};
	};

	GET_PRODUCTS = (token) => {
		return {
			url: `${BASE_URL}/cart/user`,
			headers: {
				Authorization: token,
			},
		};
	};

	DELETE_PRODUCT = (token, id) => {
		return {
			url: `${BASE_URL}/cart/delete/${id}`,
			headers: {
				Authorization: token,
			},
		};
	};

	EDIT_QUANTITY = (token, id) => {
		return {
			url: `${BASE_URL}/cart/edit-quantity/${id}`,
			headers: {
				Authorization: token,
			},
		};
	};
}
