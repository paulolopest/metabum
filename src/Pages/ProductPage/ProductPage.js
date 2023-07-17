import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { useParams } from 'react-router-dom';
import { ProductRequest } from '../../Requests/ProductRequest';
import { ReactComponent as StarIcon } from '../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as ShareIcon } from '../../Assets/icons/share-svgrepo-com.svg';
import { ReactComponent as FavoriteIcon } from '../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as CartIcon } from '../../Assets/icons/cart-svgrepo-com.svg';
import CustomInput from './../../Components/Form/CustomInput/CustomInput';
import useForm from './../../Hooks/useForm';
import { formattedPrice } from '../../Utils/Functions';
import CustomButton from './../../Components/Form/CustomButton/CustomButton';

const ProductPage = () => {
	const productRequest = new ProductRequest();

	const { id } = useParams();
	const cep = useForm('');

	const { data, get } = useAxios();

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_BY_ID(id);

		get(url);
	}, [get, id]);

	if (data)
		return (
			<div className="productPage">
				<div className="productPresentationContainer">
					<div className="productPresentation">
						<h1>{data.name}</h1>
						<div className="pp-purchase">
							<div className="pp-p-visualize">
								<div className="pp-pv-additionalInfo">
									<div className="ai-brand">
										<p>{data.brand}</p>
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
									<div className="images-miniIcons">
										<p>a</p>
										<p>a</p>
										<p>a</p>
										<p>a</p>
										<p>a</p>
									</div>
									<div className="productImg">
										<img src={data.src} alt="product" />
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
												R$ {formattedPrice((data.price / 10) * 9.5)}
											</p>
											<span>
												Cash payment with up to 5%{' '}
												<strong>OFF</strong>
											</span>
										</div>
										<div>
											<strong>
												R$ {formattedPrice(data.price)}
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
