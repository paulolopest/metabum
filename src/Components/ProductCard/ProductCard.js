import React from 'react';
import useMedia from '../../Hooks/useMedia';
import { useNavigate } from 'react-router-dom';
import { formattedPrice, limitText } from '../../Utils/Functions';
import { ReactComponent as StarIcon } from '../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as CartIcon } from '../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as FavoriteIcon } from '../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as AddCartIcon } from '../../Assets/icons/cart-add-svgrepo-com.svg';

const ProductCard = ({ product, isDragging }) => {
	const navigate = useNavigate();
	const mobileScreen = useMedia('(max-width: 600px)');

	const handleClick = () => {
		if (!isDragging) {
			navigate(`/product/${product.id}`);
		} else {
			return null;
		}
	};
	return (
		<>
			{!mobileScreen ? (
				<div onClick={handleClick} className="productCard">
					<div className="pc-IconsContainer">
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

					<p className="pc-name">{limitText(product.name, 75)}</p>

					<div className="pc-price">
						<span>R$ {formattedPrice((product.price / 10) * 12)}</span>
						<h3>R$ {formattedPrice(product.price)}</h3>
						<p>A vista no pix</p>
					</div>

					<button className="pc-button">
						<CartIcon />
						Comprar
					</button>
				</div>
			) : (
				<div onClick={handleClick} className="mobile-pCard">
					<div className="mobile-pc-icons">
						<div className="mbl-pc-iconsFirstContainer">
							<div>
								<StarIcon />
								<StarIcon />
								<StarIcon />
								<StarIcon />
								<StarIcon />
							</div>
							<p>(1)</p>
						</div>
						<div className="mbl-pc-iconsSecondContainer">
							<AddCartIcon />
							<FavoriteIcon />
						</div>
					</div>
					<div className="mobile-pc-info">
						<div className="mb-pcImg">
							<img draggable={false} src={product.src} alt="product" />
						</div>
						<div className="mbl-pc-infoSecondContainer">
							<p className="mbl-pc-name">
								{limitText(product.name, 50)}
							</p>
							<div className="mbl-pc-price">
								<span>
									R$ {formattedPrice((product.price / 10) * 12)}
								</span>
								<h3>R$ {formattedPrice(product.price)}</h3>
								<p>A vista no pix</p>
							</div>
						</div>
					</div>
					<div className="mbl-pc-buyButton">
						<button>
							<CartIcon />
							Comprar
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductCard;
