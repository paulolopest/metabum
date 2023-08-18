import React from 'react';
import { ReactComponent as EmailIcon } from '../../Assets/icons/email-svgrepo-com.svg';
import { ReactComponent as GithubIcon } from '../../Assets/icons/github-142-svgrepo-com.svg';
import { ReactComponent as LinkedinIcon } from '../../Assets/icons/linkedin-svgrepo-com.svg';

const Footer = () => {
	return (
		<div className="footerComponent">
			<div className="footer-project">
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

			<p>
				Projeto desenvolvido por{' '}
				<span>Paulo Tarso | Desenvolvedor Full Stack</span>
			</p>

			<div className="footer-contact">
				<div className="fc-gth">
					<GithubIcon />
					<a
						href="https://github.com/paulolopest/"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
				</div>
				<div className="fc-lkdn">
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
					<a href="mailto:paulotarsogl@gmail.com">E-mail</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
