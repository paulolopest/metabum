import React from 'react';
import { motion } from 'framer-motion';
import useForm from '../../../Hooks/useForm';
import useAxios from '../../../Hooks/useAxios';
import useMedia from './../../../Hooks/useMedia';
import Loading from '../../../Components/Loading/Loading';
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
import { ReactComponent as AddCartIcon } from '../../../Assets/icons/cart-add-svgrepo-com.svg';
import { ReactComponent as PreviousIcon } from '../../../Assets/icons/previous-svgrepo-com.svg';
import useMeasure from 'react-use-measure';

const BuySection = ({ productId, setProductId }) => {
	const productRequest = new ProductRequest();

	const [ref, { width }] = useMeasure();
	const mobileScreen = useMedia('(max-width: 37rem)');

	const [isDragging, setIsDragging] = React.useState(false);
	const [activeImg, setActiveImg] = React.useState(null);

	const [dragInitialPosition, setDragInitialPosition] = React.useState(0);
	const [imageIndex, setImageIndex] = React.useState(0);
	const [prev, setPrev] = React.useState(imageIndex);

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
	}, [product.data?.brand, productId]);

	let direction = imageIndex > prev ? 'increasing' : 'decreasing';

	const clickNext = () => {
		if (imageIndex === images?.data.length - 1) {
			setImageIndex(0);
			setPrev(imageIndex);
		} else {
			setImageIndex(imageIndex + 1);
			setPrev(imageIndex);
		}
	};

	const clickBack = () => {
		imageIndex === 0
			? setImageIndex(images?.data.length - 1)
			: setImageIndex(imageIndex - 1);
	};

	const verifyDrag = (e, info) => {
		if (info.point.x > dragInitialPosition) {
			clickNext();
		} else {
			clickBack();
		}
	};

	const miniIcons = images.data?.map((src) => (
		<img
			onClick={() => setActiveImg(src.big_img)}
			key={src.id}
			src={src.small_img}
			alt="icon"
		></img>
	));

	const similarProducts = similarP.data?.map((product) => (
		<li
			ref={ref}
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

	if (product?.loading || images?.loading || similarP?.loading)
		return <Loading />;

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
									<div>
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
										<StarIcon />
									</div>
									<p>(0)</p>
								</div>
								<div className="ai-shareIcons">
									<ShareIcon />
									<FavoriteIcon />
								</div>
							</div>
							<div className="pp-pv-images">
								{!mobileScreen ? (
									<>
										<div className="images-miniIcons">
											{miniIcons}
										</div>
										<div className="productImg">
											{activeImg ? (
												<img src={activeImg} alt="product" />
											) : (
												<img src={product.data.src} alt="product" />
											)}
										</div>
									</>
								) : (
									<>
										<div className={`imageLength`}>
											<div />
											<div />
											<div />
											<div />
											<div />
										</div>
										<motion.div
											initial={{
												x: direction === 'increasing' ? 20 : -20,
											}}
											animate={{ x: 0 }}
											onDragStart={(e, info) =>
												setDragInitialPosition(info.point.x)
											}
											onDragEnd={verifyDrag}
											key={imageIndex}
											drag="x"
											dragElastic={0.1}
											dragConstraints={{ right: 0, left: 0 }}
											className="mobile-productImg"
										>
											<img
												draggable={false}
												src={images?.data[imageIndex]?.big_img}
												alt="product"
											/>
										</motion.div>
									</>
								)}
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
									<div className="fc-p-firstDiv">
										<p className="fc-p-firsRow">
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
											<strong>
												R${' '}
												{formattedPrice(product.data?.price / 10)}
											</strong>{' '}
											with no interest on the credit card or 1x with
											5% <strong>OFF</strong>
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

							{mobileScreen ? (
								<>
									<div className="mobile-shipping">
										<p>Check shipping and delivery time</p>
										<div>
											<CustomInput
												placeholder="Insert cep"
												{...cep}
											/>
											<button>OK</button>
										</div>
										<a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t">
											I don't remember my zip code
										</a>
									</div>

									<div className="mobile-buyButton">
										<CustomButton>
											<CartIcon />
											Buy
										</CustomButton>
										<CustomButton className="addCartButton">
											<AddCartIcon />
										</CustomButton>
									</div>
								</>
							) : null}

							<div className="pc-secondContainer">
								<div className="pc-sc-title">
									<EtiquetteIcon />
									<p>Similar products</p>
								</div>
								<span>
									Manufacturer: <strong>{product.data.brand}</strong>
								</span>

								<motion.div
									whileTap={{ cursor: 'grabbing' }}
									className="sp-container"
								>
									<motion.ul
										className="sp-wrapper"
										drag="x"
										dragConstraints={{
											right: 0,
											left: -width * 8,
										}}
										onDrag={() => setIsDragging(true)}
										onDragEnd={() => setIsDragging(false)}
									>
										{similarProducts}
									</motion.ul>
								</motion.div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
};

export default BuySection;
