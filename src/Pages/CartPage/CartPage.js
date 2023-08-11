import React from 'react';
import useAxios from './../../Hooks/useAxios';
import { formattedPrice } from './../../Utils/Functions';
import { UserRequest } from '../../Requests/UserRequest';
import { CartRequest } from './../../Requests/CartRequest';
import { ReactComponent as BagIcon } from '../../Assets/icons/bagIcon.svg';
import { ReactComponent as AddressIcon } from '../../Assets/icons/address.svg';
import { ReactComponent as ResumeIcon } from '../../Assets/icons/resumeIcon.svg';
import { ReactComponent as NextIcon } from '../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as BackIcon } from '../../Assets/icons/previous-svgrepo-com.svg';
import { ReactComponent as TrashIcon } from '../../Assets/icons/trash-3-svgrepo-com.svg';

const CartPage = () => {
	const userRequest = new UserRequest();
	const cartRequest = new CartRequest();

	const address = useAxios();
	const cart = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.GET_USER_DEFAULT_ADDRESS(token);

		address.get(url, { headers });
	}, []);

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = cartRequest.GET_PRODUCTS(token);

		cart.get(url, { headers });
	}, []);

	const productMap = cart.data?.map((product) => (
		<div key={product.product_id} className="cip-cartProductCard">
			<div className="cpc-firstContainer">
				<img src={product.product_src} alt={product.product_name} />

				<div className="cpc-fc-productInfo">
					<span>{product.product_brand}</span>
					<h3>{product.product_name}</h3>

					<div>
						<p>
							Com desconto no pix:{' '}
							<strong>
								{formattedPrice(
									product.product_price - product.product_price / 10
								)}
							</strong>
						</p>
						<p>
							Parcelado no cartão em até 10x sem juros:{' '}
							<strong>{formattedPrice(product.product_price)}</strong>
						</p>
					</div>
				</div>
			</div>

			<div className="cpc-secondContainer">
				<div className="cpc-quantity">
					<p>Quant.</p>

					<div>
						<BackIcon />
						<p>{product.quantity}</p>
						<NextIcon />
					</div>

					<button>
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

								<button>
									<TrashIcon />
									Remover todos os produtos
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
			</div>
		);
};

export default CartPage;
