import React from 'react';
import { ReactComponent as CorrectIcon } from '../../Assets/icons/correctIcon.svg';

const PurchasePage = () => {
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
					<button>Visualizar boleto</button>
					<button>Voltar para home</button>
				</div>
			</div>
		</div>
	);
};

export default PurchasePage;
