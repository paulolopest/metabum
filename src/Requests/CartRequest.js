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
}
