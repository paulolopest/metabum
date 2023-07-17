const BASE_URL = 'https://back-metabum.vercel.app';

export class ProductRequest {
	GET_PRODUCT = () => {
		return {
			url: `${BASE_URL}/products`,
		};
	};

	GET_PRODUCT_BY_ID = (id) => {
		return {
			url: `${BASE_URL}/product/id/${id}`,
		};
	};

	GET_PRODUCT_IMAGES = (id) => {
		return {
			url: `${BASE_URL}/product/images/${id}`,
		};
	};

	GET_PRODUCT_BY_BRAND = (brand) => {
		return {
			url: `${BASE_URL}/product/brand/${brand}`,
		};
	};
}
