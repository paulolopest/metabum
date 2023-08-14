import React from 'react';
import useAxios from './../../Hooks/useAxios';
import useMedia from './../../Hooks/useMedia';
import { formattedPrice } from './../../Utils/Functions';
import { UserRequest } from '../../Requests/UserRequest';
import { CartRequest } from './../../Requests/CartRequest';
import { ReactComponent as BagIcon } from '../../Assets/icons/bagIcon.svg';
import { ReactComponent as AddressIcon } from '../../Assets/icons/address.svg';
import { ReactComponent as ResumeIcon } from '../../Assets/icons/resumeIcon.svg';
import { ReactComponent as NextIcon } from '../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as BackIcon } from '../../Assets/icons/previous-svgrepo-com.svg';
import { ReactComponent as UpIcon } from '../../Assets/icons/up-chevron-svgrepo-com.svg';
import { ReactComponent as TrashIcon } from '../../Assets/icons/trash-3-svgrepo-com.svg';
import { CartContext } from './../../Context/CartContext';
import CustomInput from '../../Components/Form/CustomInput/CustomInput';
import useForm from '../../Hooks/useForm';

const CartPage = () => {
	const userRequest = new UserRequest();
	const cartRequest = new CartRequest();

	const [resumeModal, setResumeModal] = React.useState(false);
	const [editInput, setEditInput] = React.useState(false);

	const cart = React.useContext(CartContext);

	const address = useAxios();

	const quantityInput = useForm('quantity');
	const mediumScreen = useMedia('(max-width: 65rem');
	const mobileScreen = useMedia('(max-width: 37rem)');

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.GET_USER_DEFAULT_ADDRESS(token);

		address.get(url, { headers });
	}, []);

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = cartRequest.GET_PRODUCTS(token);

		cart.getCart(url, { headers });
	}, []);

	const deleteProduct = (id) => {
		cart.deleteProduct(id);
	};

	const cleanCart = () => {
		cart.deleteCart();
	};

	const onClickAdd = (product) => {
		const body = {
			quantity: product.quantity + 1,
		};
		cart.editQuantity(product.product_id, body);
	};

	const onClickDecrease = (product) => {
		if (product.quantity <= 1) {
			return null;
		}
		const body = {
			quantity: product.quantity - 1,
		};
		cart.editQuantity(product.product_id, body);
	};

	const handleChange = async ({ target }) => {
		const body = {
			quantity: target.value,
		};
		if (!body.quantity) {
			return null;
		}
		await cart.editQuantity(target.product_id, body);
		setEditInput(false);
	};

	let totalPrice = 0;
	for (let i = 0; i < cart.data?.length; i++) {
		let item = cart.data[i];
		totalPrice += item.product_price * item.quantity;
	}

	const productMap = cart.data?.map((product) => (
		<div key={product.product_id} className="cip-cartProductCard">
			<div className="cpc-firstContainer">
				<img src={product.product_src} alt={product.product_name} />

				<div className="cpc-fc-productInfo">
					<span>{product.product_brand}</span>
					<h3>{product.product_name}</h3>

					{!mobileScreen && (
						<div>
							<p>
								Com desconto no pix:{' '}
								<strong>
									R${' '}
									{formattedPrice(
										product.product_price - product.product_price / 10
									)}
								</strong>
							</p>
							<p>
								Parcelado no cartão em até 10x sem juros:{' '}
								<strong>
									R$ {formattedPrice(product.product_price)}
								</strong>
							</p>
						</div>
					)}
				</div>
			</div>

			{mobileScreen && (
				<div className="cpc-mobilePriceContainer">
					<p>
						Com desconto no pix:{' '}
						<strong>
							R${' '}
							{formattedPrice(
								product.product_price - product.product_price / 10
							)}
						</strong>
					</p>
					<p>
						Parcelado no cartão em até 10x sem juros:{' '}
						<strong>R$ {formattedPrice(product.product_price)}</strong>
					</p>
				</div>
			)}

			<div className="cpc-secondContainer">
				<div className="cpc-quantity">
					<p>Quant.</p>

					<div>
						<BackIcon onClick={() => onClickDecrease(product)} />
						<span>{product.quantity}</span>
						<NextIcon onClick={() => onClickAdd(product)} />
					</div>

					<button onClick={() => deleteProduct(product.product_id)}>
						<TrashIcon />
						Remover
					</button>
				</div>

				<div className="cpc-endPrice">
					<p>Preço à vista no PIX:</p>
					<span>R$ {formattedPrice(product.product_price)}</span>
				</div>
			</div>
		</div>
	));

	if (address.data && cart.data)
		return (
			<div className="cartPage">
				<div className="cartPageSection">
					<div className="cps-cartInfo">
						<div className="ci_address-container">
							<div className="ci_address-title">
								<AddressIcon />
								<p>Selecione o endereço</p>
							</div>

							<div className="ci_address-card">
								<div className="address-card-fc">
									<strong>{address.data.identification}</strong>
									<p>
										{address.data.street}, {address.data.complement}
									</p>
									<p>
										Número: {address.data.number},{' '}
										{address.data.reference}
									</p>
									<p>
										CEP: {address.data.zip_code} - {address.data.city}
										, {address.data.uf}
									</p>
								</div>

								<div className="address-card-sc">
									<button>selecionar outro</button>
									<button>novo endereço</button>
								</div>
							</div>
						</div>

						<div className="ci_products-container">
							<div className="cip-title">
								<div>
									<BagIcon />
									<p>Produtos</p>
								</div>

								<button onClick={() => cleanCart()}>
									<TrashIcon />
									{!mobileScreen
										? 'Remover todos os produtos'
										: 'Remover tudo'}
								</button>
							</div>

							<div className="cip-products">{productMap}</div>
						</div>
					</div>

					<div className="cps-cartResume">
						<div className="cr_card">
							<div className="crc_title">
								<ResumeIcon />
								<p>Resumo</p>
							</div>

							<div className="crc_infoContainer">
								<div className="crc-if-cartValue">
									<p>Valor dos produtos:</p>
									<strong>100</strong>
								</div>

								<div className="crc-if-shipping">
									<p>Frete:</p>
									<strong>20</strong>
								</div>

								<div className="crc-if-longPrice">
									<div>
										<p>Total a prazo:</p>
										<strong>1000</strong>
									</div>

									<p>
										(em até <strong>10x</strong> de{' '}
										<strong>
											R$ {formattedPrice(450)} sem juros
										</strong>
										)
									</p>
								</div>

								<div className="crc-if-discountBox">
									<p>
										Valor a vista no <strong>PIX</strong>
									</p>
									<strong>R$ {formattedPrice(4000)}</strong>
									<p>(Economize: R$ )</p>
								</div>
								<div className="crc-if-buttons">
									<button>Ir para o pagamento</button>
									<button>Continuar comprando</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{mediumScreen && (
					<div
						onClick={() => setResumeModal(!resumeModal)}
						className="mobileResume"
					>
						<div className="mr-icon">
							<UpIcon
								style={{
									transform: resumeModal && 'rotate(180deg)',
									transition: 'ease-in-out 0.3s',
								}}
							/>
						</div>

						<div className="mr-title">
							<div>
								<ResumeIcon />
								<p>Resumo</p>
							</div>

							<div>
								Valor no pix: R${' '}
								{formattedPrice(totalPrice - (totalPrice * 10) / 100)}
							</div>
						</div>

						<div
							className={
								resumeModal ? 'mr-content animeUp' : 'displayNone'
							}
						>
							<div className="mrc-prices">
								<div className="mrc-cartValue">
									<p>Valor dos produtos:</p>
									<span>R$ {formattedPrice(totalPrice)}</span>
								</div>

								<div>
									<p>Frete</p>
									<span>R$ {formattedPrice(10)}</span>
								</div>

								<div className="mrcp-finalCont">
									<div>
										<p>Total à prazo:</p>
										<span>
											R$
											{formattedPrice(totalPrice)}
										</span>
									</div>
									<p>
										(em até <strong>10x</strong> de{' '}
										<strong>
											R$ {formattedPrice(totalPrice / 10)} sem juros
										</strong>
										)
									</p>
								</div>
							</div>

							<div className="mrc-finalPrice">
								<div>
									<p>Valor a vista no Pix</p>
									<strong>
										R${' '}
										{formattedPrice(
											totalPrice - (totalPrice * 10) / 100
										)}
									</strong>
									<span>
										(Economize: R$
										{formattedPrice((totalPrice * 10) / 100)})
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
};

export default CartPage;
