import React from 'react';
import useAxios from './../../../Hooks/useAxios';
import { ProductRequest } from '../../../Requests/ProductRequest';
import ProductCard from './ProductCard/ProductCard';

const MainFeed = () => {
	const productRequest = new ProductRequest();
	const { data, loading, error, get } = useAxios();

	const products = data && data;

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT();

		get(url);
	}, []);

	const productMap = products?.map((product) => (
		<ProductCard key={product.id} product={product} />
	));

	return <div>{productMap}</div>;
};

export default MainFeed;
