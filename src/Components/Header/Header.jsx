import React from 'react';
import Cart from '../Cart/Cart';
import useForm from '../../Hooks/useForm';
import useMedia from '../../Hooks/useMedia';
import SearchModal from '../SearchModal/SearchModal';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import Logo from '../../Assets/images/metabumbanner.png';
import CustomInput from '../Form/CustomInput/CustomInput';
import { GlobalContext } from '../../Context/GlobalContext';
import { ReactComponent as Menu } from '../../Assets/icons/menu.svg';
import { ReactComponent as UserIcon } from '../../Assets/icons/user.svg';
import profileImage from '../../Assets/images/profile_ninja-c2466b7f.png';
import { ReactComponent as OrderIcon } from '../../Assets/icons/bag.svg';
import { ReactComponent as KabumIcon } from '../../Assets/icons/kabum.svg';
import { ReactComponent as SearchIcon } from '../../Assets/icons/search.svg';
import { ReactComponent as CartIcon } from '../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as CloseIcon } from '../../Assets/icons/close-svgrepo-com.svg';
import { ReactComponent as FAQIcon } from '../../Assets/icons/contact-svgrepo-com.svg';
import { ReactComponent as FavoritesIcon } from '../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as MagnifyingGlass } from '../../Assets/icons/search-svgrepo-com.svg';
import { ReactComponent as ProfileIcon } from '../../Assets/icons/profile-circle-svgrepo-com.svg';

const Header = () => {
	const [leftNav, setLeftNav] = React.useState(false);
	const [searchModal, setSearchModal] = React.useState(false);

	const { data, login, userLogout } = React.useContext(GlobalContext);
	const { cartBar, setCartBar } = React.useContext(CartContext);

	const desktopScreen = useMedia('(max-width: 65rem)');
	const mediumScreen = useMedia('(max-width: 53rem)');
	const mobileScreen = useMedia('(max-width: 37.5rem)');

	const search = useForm('form');
	const navigate = useNavigate();

	const activeLeftBar = () => {
		setSearchModal(false);
		setLeftNav(!leftNav);

		document.body.classList.add('activeBar');
	};

	const activeCartBar = () => {
		setSearchModal(false);
		setCartBar(!cartBar);
	};

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setLeftNav(false);
		}
	};

	const closeModal = (e) => {
		if (e.target === e.currentTarget) setSearchModal(false);
	};

	const handleSearch = () => {
		setSearchModal(false);
		navigate(`/catalog/${search.value}`);
	};

	React.useEffect(() => {
		if (leftNav || cartBar || searchModal) {
			document.body.classList.add('loading');
		} else {
			document.body.classList.remove('loading');
		}
	}, [leftNav, cartBar, searchModal]);

	return (
		<>
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
					<div>
						<CustomInput
							type="text"
							name="search"
							className="searchInput"
							placeHolder="Pesquisar"
							autoComplete="off"
							{...search}
						/>
						{mobileScreen ? (
							<button onClick={handleSearch}>
								<MagnifyingGlass />
							</button>
						) : (
							<button onClick={handleSearch}>
								<SearchIcon />
							</button>
						)}
					</div>
					{!mobileScreen && (
						<SearchModal
							word={search.value}
							searchModal={searchModal}
							setSearchModal={setSearchModal}
						/>
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
									Faça <Link to="/login">Login</Link> ou <br /> crie
									seu <Link to="/login/signup">Cadastro</Link>
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
			</div>

			<div onClick={closeModal} className={searchModal ? 'fakeScreen' : ''}>
				{mobileScreen && (
					<SearchModal
						word={search.value}
						searchModal={searchModal}
						setSearchModal={setSearchModal}
					/>
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
						<div>
							<img src={profileImage} alt="profile" />
							<p>Ninja{login ? `: ${data?.name}` : ''}</p>
						</div>

						{mobileScreen && (
							<CloseIcon onClick={() => setLeftNav(false)} />
						)}
					</div>
					<div className="lNav-Links">
						<Link onClick={() => setLeftNav(false)} to="/my-profile">
							<div className="lNav-Links-card">
								<UserIcon />
								<p>Minha conta</p>
							</div>
						</Link>
						<Link onClick={() => setLeftNav(false)} to="/cart">
							<div className="lNav-Links-card">
								<OrderIcon />
								<p>Carrinho</p>
							</div>
						</Link>
						<div className="lNav-Links-card">
							<FavoritesIcon />
							<p>Favoritos</p>
						</div>
						<div className="lNav-Links-card">
							<FAQIcon />
							<p>FAQ</p>
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
									CADASTRO
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>

			<Cart />
		</>
	);
};

export default Header;
