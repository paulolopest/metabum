const BASE_URL = 'https://back-metabum.vercel.app';

export class ProductRequest {
	GET_PRODUCTS = () => {
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

	GET_PRODUCT_DESCRIPTION = (id) => {
		return {
			url: `${BASE_URL}/product/description/${id}`,
		};
	};

	GET_PRODUCT_TECHNICAL_INFO = (id) => {
		return {
			url: `${BASE_URL}/product/technical-information/${id}`,
		};
	};

	SEARCH_PRODUCTS = (word) => {
		return {
			url: `${BASE_URL}/products/search/${word}`,
		};
	};
}
