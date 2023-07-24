import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formattedPrice, limitText } from '../../../Utils/Functions';
import { ReactComponent as CartIcon } from '../../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as FavoriteIcon } from '../../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as AddCartIcon } from '../../../Assets/icons/cart-add-svgrepo-com.svg';

const HPProductCard = ({ product, isDragging }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/product/${product.id}`);
	};
	return (
		<div
			onClick={() => (isDragging ? null : handleClick)}
			className="hp-productCard"
		>
			<div className="hp-pc-IconsContainer">
				<div className="ic-firstBlock">
					<p>Restam</p>
					<span>{product.quantity}</span>
					<p>UNID.</p>
				</div>
				<div className="ic-secondBlock">
					<AddCartIcon />
					<FavoriteIcon />
				</div>
			</div>

			<img draggable={false} src={product.src} alt="product" />

			<p className="hp-pc-name">{limitText(product.name, 90)}</p>

			<div className="hp-pc-price">
				<span>R$ {formattedPrice((product.price / 10) * 12)}</span>
				<h3>R$ {formattedPrice(product.price)}</h3>
				<p>A vista no pix</p>
			</div>

			<button className="hp-pc-button">
				<CartIcon />
				Comprar
			</button>
		</div>
	);
};

export default HPProductCard;
