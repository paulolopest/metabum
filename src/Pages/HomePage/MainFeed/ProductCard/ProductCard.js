import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../../Context/CartContext';

const ProductCard = ({ product }) => {
	const { addProduct } = React.useContext(CartContext);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${product.id}`);
	};

	const handleAddCart = React.useCallback(() => {
		addProduct(product.id);
	}, [addProduct, product.id]);

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
