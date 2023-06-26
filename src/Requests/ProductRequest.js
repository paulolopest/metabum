const BASE_URL = 'https://back-metabum.vercel.app';

export class ProductRequest {
	GET_PRODUCT = () => {
		return {
			url: `${BASE_URL}/products`,
		};
	};

	GET_PRODUCT_BY_ID = (id) => {
		return {
			url: `${BASE_URL}/products/${id}`,
		};
	};
}
