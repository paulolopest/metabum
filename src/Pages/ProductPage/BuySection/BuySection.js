import React from 'react';
import { motion } from 'framer-motion';
import useForm from '../../../Hooks/useForm';
import useAxios from '../../../Hooks/useAxios';
import { formattedPrice } from '../../../Utils/Functions';
import { ProductRequest } from '../../../Requests/ProductRequest';
import CustomInput from '../../../Components/Form/CustomInput/CustomInput';
import CustomButton from '../../../Components/Form/CustomButton/CustomButton';
import { ReactComponent as EtiquetteIcon } from '../../../Assets/icons/etiquette.svg';
import { ReactComponent as CartIcon } from '../../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as StarIcon } from '../../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as NextIcon } from '../../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as ShareIcon } from '../../../Assets/icons/share-svgrepo-com.svg';
import { ReactComponent as FavoriteIcon } from '../../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as PreviousIcon } from '../../../Assets/icons/previous-svgrepo-com.svg';

const BuySection = ({ id }) => {
	const productRequest = new ProductRequest();

	const carousel = React.useRef();

	const [isDragging, setIsDragging] = React.useState(false);
	const [productId, setProductId] = React.useState(id);
	const [activeImg, setActiveImg] = React.useState(null);
	const [similarProductWidth, setSimilarProductWidth] = React.useState(0);

	const product = useAxios();
	const images = useAxios();
	const similarP = useAxios();

	const cep = useForm('');

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_BY_ID(productId);

		product.get(url);
	}, [productId]);

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_IMAGES(productId);

		images.get(url);
	}, [productId]);

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_BY_BRAND(product?.data?.brand);

		similarP.get(url);
	}, [product.data?.brand, similarP.get]);

	React.useEffect(() => {
		setSimilarProductWidth(
			carousel?.current?.scrollWidth - carousel?.current?.offsetWidth
		);
	}, []);

	const miniIcons = images.data?.map((src) => (
		<img
			onClick={() => setActiveImg(src.big_img)}
			key={src.id}
			src={src.small_img}
			alt="icon"
		></img>
	));

	console.log(carousel?.current?.scrollWidth);

	const similarProducts = similarP.data?.map((product) => (
		<li
			onClick={
				isDragging
					? null
					: (e) => {
							e.stopPropagation();
							setProductId(product.id);
							setActiveImg(null);
					  }
			}
			key={product.id}
			className="sp-card"
		>
			<motion.div>
				<img src={product.src} alt="similar product" />
			</motion.div>
			<p>R$ {formattedPrice(product.price)}</p>
		</li>
	));

	if (product?.data)
		return (
			<div className="productPresentationContainer">
				<div className="productPresentation">
					<h1>{product.data.name}</h1>
					<div className="pp-purchase">
						<div className="pp-p-visualize">
							<div className="pp-pv-additionalInfo">
								<div className="ai-brand">
									<p>{product.data.brand}</p>
								</div>
								<div className="ai-starIcons">
									<StarIcon />
									<StarIcon />
									<StarIcon />
									<StarIcon />
									<StarIcon />
									<p>(0)</p>
								</div>
								<div className="ai-shareIcons">
									<ShareIcon />
									<FavoriteIcon />
								</div>
							</div>
							<div className="pp-pv-images">
								<div className="images-miniIcons">{miniIcons}</div>
								<div className="productImg">
									{activeImg ? (
										<img src={activeImg} alt="product" />
									) : (
										<img src={product.data.src} alt="product" />
									)}
								</div>
							</div>
							<div className="pp-pv-shipping">
								<p>Check shipping and delivery time</p>
								<div>
									<CustomInput placeholder="Insert cep" {...cep} />
									<button>OK</button>
								</div>
								<a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t">
									I don't remember my zip code
								</a>
							</div>
						</div>
						<div className="pp-p-purchaseCallback">
							<div className="pc-firstContainer">
								<div className="pc-fc-price">
									<div>
										<p>
											Sold and delivered by:{' '}
											<strong>Metabum!</strong> |{' '}
											<strong>In stock</strong>
										</p>
										<p className="pc-price">
											R${' '}
											{formattedPrice(
												(product.data.price / 10) * 9.5
											)}
										</p>
										<span>
											Cash payment with up to 5% <strong>OFF</strong>
										</span>
									</div>
									<div>
										<strong>
											R$ {formattedPrice(product.data.price)}
										</strong>
										<p>
											In up to 10x of{' '}
											<strong>$ {product.data?.price / 10}</strong>{' '}
											with no interest on the
											<br /> credit card Or 1x in cart with 5%{' '}
											<strong>OFF</strong>
										</p>
										<span>See more options of payment</span>
									</div>
								</div>
								<div className="pc-fc-buy-button">
									<CustomButton>
										<CartIcon />
										Buy
									</CustomButton>
								</div>
							</div>
							<div className="pc-secondContainer">
								<div className="pc-sc-title">
									<EtiquetteIcon />
									<p>Similar products</p>
								</div>
								<p>
									Manufacturer: <strong>{product.data.brand}</strong>
								</p>

								<motion.div
									ref={carousel}
									whileTap={{ cursor: 'grabbing' }}
									className="sp-container"
								>
									<button>
										<PreviousIcon />
									</button>
									<motion.ul
										className="sp-wrapper"
										drag="x"
										dragConstraints={{
											right: 0,
											left: -730,
										}}
										onDrag={() => setIsDragging(true)}
										onDragEnd={() => setIsDragging(false)}
									>
										{similarProducts}
									</motion.ul>
									<motion.button drag="x">
										<NextIcon />
									</motion.button>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
};

export default BuySection;
