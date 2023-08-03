import React from 'react';
import { Link } from 'react-router-dom';
import useForm from './../../Hooks/useForm';
import useMedia from './../../Hooks/useMedia';
import { CartContext } from '../../Context/CartContext';
import Logo from '../../Assets/images/metabumbanner.png';
import CustomInput from './../Form/CustomInput/CustomInput';
import { GlobalContext } from './../../Context/GlobalContext';
import { ReactComponent as Menu } from '../../Assets/icons/menu.svg';
import { ReactComponent as UserIcon } from '../../Assets/icons/user.svg';
import profileImage from '../../Assets/images/profile_ninja-c2466b7f.png';
import { ReactComponent as OrderIcon } from '../../Assets/icons/truck.svg';
import { ReactComponent as KabumIcon } from '../../Assets/icons/kabum.svg';
import { ReactComponent as SearchIcon } from '../../Assets/icons/search.svg';
import { ReactComponent as CartIcon } from '../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as FAQIcon } from '../../Assets/icons/contact-svgrepo-com.svg';
import { ReactComponent as FavoritesIcon } from '../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as MagnifyingGlass } from '../../Assets/icons/search-svgrepo-com.svg';
import { ReactComponent as ProfileIcon } from '../../Assets/icons/profile-circle-svgrepo-com.svg';

const Header = () => {
	const [leftNav, setLeftNav] = React.useState(false);
	const { data, login, userLogout } = React.useContext(GlobalContext);
	const { cartBar, setCartBar } = React.useContext(CartContext);

	const desktopScreen = useMedia('(max-width: 65rem)');
	const mediumScreen = useMedia('(max-width: 53rem)');
	const mobileScreen = useMedia('(max-width: 37rem)');

	const search = useForm('form');

	const activeLeftBar = () => {
		setLeftNav(!leftNav);

		document.body.classList.add('activeBar');
	};

	const activeCartBar = () => {
		setCartBar(!cartBar);
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setLeftNav(false);
		}

		document.body.classList.remove('activeBar');
	};

	return (
		<div className="headerContainer">
			<div className="headerMenu">
				<div className="hbg-menu" onClick={activeLeftBar}>
					<Menu />
				</div>

				{mobileScreen ? (
					<Link to="/">
						<KabumIcon />
					</Link>
				) : (
					<Link to="/">
						{desktopScreen ? (
							<KabumIcon />
						) : (
							<img src={Logo} alt="logo"></img>
						)}
					</Link>
				)}
			</div>
			<div className="searchContainer">
				<CustomInput
					type="text"
					name="search"
					className="searchInput"
					placeHolder="Search"
					{...search}
				/>
				{mobileScreen ? (
					<button>
						<MagnifyingGlass />
					</button>
				) : (
					<button>
						<SearchIcon />
					</button>
				)}
			</div>
			{mediumScreen ? (
				<></>
			) : (
				<div className="header-LoginContainer">
					{login ? (
						<>
							<img src={profileImage} alt="profile" />
							<p>
								Olá, {data?.name}
								<br />
								<Link to="/my-profile">Minha Conta</Link> |{' '}
								<Link onClick={userLogout}>Sair</Link>
							</p>
						</>
					) : (
						<>
							<ProfileIcon />
							<p>
								Faça <Link to="/login">Login</Link> ou <br /> crie seu{' '}
								<Link to="/login/signup">Cadastro</Link>
							</p>
						</>
					)}
				</div>
			)}
			<div className="header-IconsContainer">
				<Link onClick={activeCartBar}>
					<CartIcon />
				</Link>
				{mobileScreen ? (
					<></>
				) : (
					<Link>
						<FavoritesIcon />
					</Link>
				)}
				{desktopScreen ? (
					<></>
				) : (
					<Link>
						<FAQIcon />
					</Link>
				)}
			</div>
			<div
				onClick={onClickOutside}
				className={
					leftNav ? `leftNav-container disableScrollBar` : `displayNone`
				}
			>
				<div className={leftNav ? `left-nav animeLeft` : `displayNone`}>
					<div className="lNav-profile">
						<img src={profileImage} alt="profile" />
						<p>Ninja{login ? `: ${data?.name}` : ''}</p>
					</div>
					<div className="lNav-Links">
						<Link onClick={() => setLeftNav(false)} to="/my-profile">
							<div className="lNav-Links-card">
								<UserIcon />
								<p>Minha conta</p>
							</div>
						</Link>
						<div className="lNav-Links-card">
							<OrderIcon />
							<p>Meus pedidos</p>
						</div>
						<div className="lNav-Links-card">
							<FavoritesIcon />
							<p>Favoritos</p>
						</div>
					</div>
					<div className="lNav-buttons">
						{login ? (
							<div>
								<Link onClick={userLogout}>SAIR</Link>
							</div>
						) : (
							<div>
								<Link onClick={() => setLeftNav(false)} to="/login">
									ENTRAR
								</Link>
								<Link
									onClick={() => setLeftNav(false)}
									to="/login/signup
								"
								>
									CADASTRE-SE
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
