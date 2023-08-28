import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CorrectIcon } from '../../Assets/icons/correctIcon.svg';
import { ReactComponent as EmailIcon } from '../../Assets/icons/email-svgrepo-com.svg';
import { ReactComponent as GithubIcon } from '../../Assets/icons/github-142-svgrepo-com.svg';
import { ReactComponent as LinkedinIcon } from '../../Assets/icons/linkedin-svgrepo-com.svg';

const PurchasePage = () => {
	const [modal, setModal] = React.useState(false);

	const navigate = useNavigate();

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setModal(false);
		}
	};

	return (
		<div className="purchasedPage">
			<div className="purchasedPageContainer">
				<div className="ppc-title">
					<CorrectIcon />
					<h1>Compra realizada com sucesso</h1>
				</div>

				<div className="ppc-desc">
					<p>
						Falta pouco para sua compra ser realizada! Agora é <br />
						só gerar o seu boleto clicando abaixo no link "Visualizar{' '}
						<br /> boleto" e fazer o pagamento
					</p>

					<p>
						Depois de pagar, aguarde o tempo de compensação do <br />
						boleto (até 72 horas) para validarmos o pagamento.
					</p>
				</div>

				<div className="ppc-buttons">
					<button onClick={() => setModal(true)}>Visualizar boleto</button>
					<button onClick={() => navigate('/')}>Voltar para home</button>
				</div>
			</div>

			{modal && (
				<div onClick={onClickOutside} className="pp-modalContainer">
					<div className="pp-modal">
						<div className="ppm-content">
							<p className="ppmc-title">Obrigado por usar o projeto!</p>

							<div className="ppmc-content">
								<div className="ppmcc-contact">
									<span>Redes</span>

									<div className="pp-contactCardContainer">
										<div>
											<GithubIcon />
											<a
												href="https://github.com/paulolopest/"
												target="_blank"
												rel="noreferrer"
											>
												GitHub
											</a>
										</div>
										<div>
											<LinkedinIcon />
											<a
												href="https://www.linkedin.com/in/paulo-tarso-92bb0823a/"
												target="_blank"
												rel="noreferrer"
											>
												Linkedin
											</a>
										</div>
										<div>
											<EmailIcon />
											<a href="mailto:paulotarsogl@gmail.com">
												E-mail
											</a>
										</div>
									</div>
								</div>

								<div className="ppmcc-project">
									<span>Código</span>
									<div>
										<a
											target="_blank"
											href="https://github.com/paulolopest/back_metabum"
											rel="noreferrer"
										>
											Backend
										</a>
										<a
											target="_blank"
											href="https://github.com/paulolopest/techmarket"
											rel="noreferrer"
										>
											Frontend
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PurchasePage;
