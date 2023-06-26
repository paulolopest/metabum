import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/product/${product.id}`);
	};

	return (
		<div onClick={handleClick} className="mainFeed-productCard">
			<h1>{product.name}</h1>
			<img src={product.src} alt="Product"></img>
			<p>R$ {product.price}</p>
		</div>
	);
};

export default ProductCard;
