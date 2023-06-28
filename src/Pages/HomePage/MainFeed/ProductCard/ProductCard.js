import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartRequest } from './../../../../Requests/CartRequest';
import useAxios from '../../../../Hooks/useAxios';

const cartRequest = new CartRequest();
const token = window.localStorage.getItem('metabumtoken');

const ProductCard = ({ product }) => {
	const { post } = useAxios();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${product.id}`);
	};

	const handleAddCart = React.useCallback(() => {
		const { url, headers } = cartRequest.ADD_PRODUCT(product.id, token);

		post(url, null, { headers });
	}, [post, product.id]);

	return (
		<div className="mainFeed-productCard">
			<div className="productCard-info" onClick={handleClick}>
				<h1>{product.name}</h1>
				<img src={product.src} alt="Product"></img>
			</div>
			<div>
				<p>R$ {product.price}</p>
				<button onClick={handleAddCart}>Cart</button>
				<button>Buy</button>
			</div>
		</div>
	);
};

export default ProductCard;
