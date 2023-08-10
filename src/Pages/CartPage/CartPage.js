import React from 'react';
import { formattedPrice } from './../../Utils/Functions';
import { ReactComponent as ResumeIcon } from '../../Assets/icons/resumeIcon.svg';
import { ReactComponent as AddressIcon } from '../../Assets/icons/address.svg';
import useAxios from './../../Hooks/useAxios';
import { UserRequest } from '../../Requests/UserRequest';

const CartPage = () => {
	const userRequest = new UserRequest();

	const address = useAxios();
	const cart = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, headers } = userRequest.GET_USER_DEFAULT_ADDRESS(token);

		address.get(url, { headers });
	}, []);

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
	});

	if (address.data)
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

						<div>
							<div>
								<div>
									<p>Icon</p>
									<p>Produto e serviço</p>
								</div>

								<button>Remover todos os produtos</button>
							</div>

							<div>
								<div>Array de produtos</div>
							</div>
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
