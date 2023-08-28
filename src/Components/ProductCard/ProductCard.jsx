import React, { useContext } from 'react';
import useMedia from '../../Hooks/useMedia';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { formattedPrice, limitText } from '../../Utils/Functions';
import { ReactComponent as StarIcon } from '../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as CartIcon } from '../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as FavoriteIcon } from '../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as AddCartIcon } from '../../Assets/icons/cart-add-svgrepo-com.svg';

const ProductCard = ({ product, isDragging }) => {
	const cart = useContext(CartContext);

	const navigate = useNavigate();
	const mobileScreen = useMedia('(max-width: 600px)');

	const addToCart = (id) => {
		cart.addProduct(id);
		cart.showPopUp();
	};

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
				<div className="productCard">
					<div className="pc-IconsContainer">
						<div className="ic-firstBlock">
							<p>Restam</p>
							<span>{product.quantity}</span>
							<p>UNID.</p>
						</div>
						<div className="ic-secondBlock">
							<AddCartIcon onClick={() => addToCart(product.id)} />
							<FavoriteIcon />
						</div>
					</div>

					<img
						onClick={handleClick}
						draggable={false}
						src={product.src}
						alt="product"
					/>

					<p onClick={handleClick} className="pc-name">
						{limitText(product.name, 75)}
					</p>

					<div onClick={handleClick} className="pc-price">
						<span>R$ {formattedPrice(product.price)}</span>
						<h3>
							R$ {formattedPrice(product.price - product.price / 10)}
						</h3>
						<p>A vista no pix</p>
					</div>

					<button onClick={handleClick} className="pc-button">
						<CartIcon />
						Comprar
					</button>
				</div>
			) : (
				<div className="mobile-pCard">
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
							<AddCartIcon onClick={() => addToCart(product.id)} />
							<FavoriteIcon />
						</div>
					</div>
					<div className="mobile-pc-info">
						<div onClick={handleClick} className="mb-pcImg">
							<img draggable={false} src={product.src} alt="product" />
						</div>
						<div
							onClick={handleClick}
							className="mbl-pc-infoSecondContainer"
						>
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
