const BASE_URL = 'https://back-metabum.vercel.app';

export class ProductRequest {
	GET_PRODUCT = () => {
		return {
			url: `${BASE_URL}/products`,
		};
	};
}
