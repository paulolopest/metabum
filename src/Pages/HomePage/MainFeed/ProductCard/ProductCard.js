import React from 'react';

const ProductCard = ({ product }) => {
	return (
		<div className="mainFeed-productCard">
			<h1>{product.name}</h1>
			<img src={product.src} alt="Product"></img>
			<p>R$ {product.price}</p>
		</div>
	);
};

export default ProductCard;
