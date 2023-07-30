import React from 'react';
import { formattedPrice } from '../../Utils/Functions';
import { GlobalContext } from '../../Context/GlobalContext';
import { ReactComponent as BagIcon } from '../../Assets/icons/bag.svg';
import { ReactComponent as EmailIcon } from '../../Assets/icons/email.svg';
import { ReactComponent as AskIcon } from '../../Assets/icons/ask&ans.svg';
import { ReactComponent as ConfigIcon } from '../../Assets/icons/config.svg';
import { ReactComponent as ShortcutIcon } from '../../Assets/icons/atalhos.svg';
import { ReactComponent as HeartIcon } from '../../Assets/icons/heart-svgrepo-com.svg';

const UserPage = () => {
	const { data } = React.useContext(GlobalContext);

	if (data)
		return (
			<div className="userPage">
				<div className="userContainer">
					<div className="userFirstContainer">
						<div className="ufc-profileCard">
							<img
								src="https://static.kabum.com.br/conteudo/temas/001/imagens/k5/images/profile_ninja.png"
								alt="profile"
							/>
							<div>
								<strong>Bem vindo, {data.name}</strong>
								<div>
									<EmailIcon />
									<p>{data.email}</p>
								</div>
							</div>
							<ConfigIcon className="configIcon" />
						</div>

						<div className="ufc-AccountMoneyCard">
							<div>
								<p>Crédito disponível</p>
								<span>R$ {formattedPrice(199)}</span>
							</div>

							<button>Resgatar gift card</button>
						</div>
					</div>
					<div className="userSecondContainer">
						<div className="usc-title">
							<ShortcutIcon />
							<p>Atalhos</p>
						</div>
						<div className="usc-cardContainer">
							<div>
								<BagIcon />
								<p>Meus pedidos</p>
							</div>
							<div>
								<AskIcon />
								<p>Protocolos e atendimento</p>
							</div>
							<div>
								<HeartIcon />
								<p>Favoritos</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
};

export default UserPage;
