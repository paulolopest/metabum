import React from 'react';
import useForm from './../../Hooks/useForm';
import useAxios from '../../Hooks/useAxios';
import { useParams } from 'react-router-dom';
import { formattedPrice } from '../../Utils/Functions';
import { ProductRequest } from '../../Requests/ProductRequest';
import CustomInput from './../../Components/Form/CustomInput/CustomInput';
import CustomButton from './../../Components/Form/CustomButton/CustomButton';
import { ReactComponent as CartIcon } from '../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as StarIcon } from '../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as ShareIcon } from '../../Assets/icons/share-svgrepo-com.svg';
import { ReactComponent as FavoriteIcon } from '../../Assets/icons/heart-svgrepo-com.svg';

const ProductPage = () => {
	const productRequest = new ProductRequest();
	const [activeImg, setActiveImg] = React.useState(null);

	const { id } = useParams();
	const cep = useForm('');

	const product = useAxios();
	const images = useAxios();

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_BY_ID(id);

		product.get(url);
	}, [product.get, id]);

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_IMAGES(id);

		images.get(url);
	}, [images.get, id]);

	const miniIcons = images.data?.map((src) => (
		<img
			onClick={() => setActiveImg(src.big_img)}
			key={src.id}
			src={src.small_img}
			alt="icon"
		></img>
	));

	if (product?.data)
		return (
			<div className="productPage">
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
										<a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t">
											I dont't remember my zip code
										</a>
									</div>
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
												Cash payment with up to 5%{' '}
												<strong>OFF</strong>
											</span>
										</div>
										<div>
											<strong>
												R$ {formattedPrice(product.data.price)}
											</strong>
											<p>
												In up to 10x of <strong>$34.90</strong> with
												no interest on the
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
								<div>
									<div>
										<p>Icon</p>
										<p>Produtos similares</p>
									</div>
									<p>Fabricante: marca</p>
									<div>
										<div>
											<p>Foto do produto</p>
											<p>Preco</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
};

export default ProductPage;
