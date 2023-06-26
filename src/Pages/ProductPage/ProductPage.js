import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import { ProductRequest } from '../../Requests/ProductRequest';

const ProductPage = () => {
	const productRequest = new ProductRequest();
	const { id } = useParams();
	const { data, error, get } = useAxios();

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_BY_ID(id);

		get(url);
	}, []);

	if (data) return <div>{data.name}</div>;
};

export default ProductPage;
