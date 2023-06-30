import React from 'react';
import useAxios from './../../../Hooks/useAxios';
import { ProductRequest } from '../../../Requests/ProductRequest';
import ProductCard from './ProductCard/ProductCard';
import Cart from '../../../Components/Cart/Cart';

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

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<div>{productMap}</div>
			<div>{/* <Cart /> */}</div>
		</div>
	);
};

export default MainFeed;
