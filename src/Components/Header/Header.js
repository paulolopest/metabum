import React from 'react';
import { GlobalContext } from './../../Context/GlobalContext';
import CustomInput from './../Form/CustomInput/CustomInput';
import useForm from './../../Hooks/useForm';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/images/cabum-logo-bcfcd17b.png';
import profileImage from '../../Assets/images/profile_ninja-c2466b7f.png';
import { ReactComponent as Menu } from '../../Assets/icons/menu.svg';
import { ReactComponent as UserIcon } from '../../Assets/icons/user.svg';
import { ReactComponent as OrderIcon } from '../../Assets/icons/truck.svg';
import { ReactComponent as SearchIcon } from '../../Assets/icons/search.svg';
import { ReactComponent as ProfileIcon } from '../../Assets/icons/profile-circle-svgrepo-com.svg';
import { ReactComponent as CartIcon } from '../../Assets/icons/cart-svgrepo-com.svg';
import { ReactComponent as FavoritesIcon } from '../../Assets/icons/heart-svgrepo-com.svg';
import { ReactComponent as FAQIcon } from '../../Assets/icons/contact-svgrepo-com.svg';
import { ReactComponent as KabumIcon } from '../../Assets/icons/kabum.svg';
import useMedia from './../../Hooks/useMedia';

const Header = () => {
	const [leftNav, setLeftNav] = React.useState(false);
	const { data, login, userLogout } = React.useContext(GlobalContext);
	const [mobileMenu, setMobileMenu] = React.useState(false);

	const desktopScreen = useMedia('(max-width: 65rem)');
	const mediumScreen = useMedia('(max-width: 53rem)');
	const mobileScreen = useMedia('(max-width: 37rem)');

	const search = useForm('form');

	const activeLeftBar = React.useCallback(() => {
		setLeftNav(!leftNav);
	}, [leftNav]);

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setLeftNav(false);
		}
	};

	return (
		<div className="headerContainer">
			<div className="headerLinks">
				<div className="hbg-menu" onClick={activeLeftBar}>
					<Menu />
				</div>
				{mobileScreen ? (
					<></>
				) : (
					<div>
						{desktopScreen ? (
							<KabumIcon />
						) : (
							<img src={Logo} alt="logo"></img>
						)}
					</div>
				)}
			</div>
			<div className="searchContainer">
				<CustomInput
					type="text"
					name="search"
					className="searchInput"
					placeHolder="Search here"
					{...search}
				/>
				<div>
					<SearchIcon />
				</div>
			</div>
			{mediumScreen ? (
				<></>
			) : (
				<div className="header-LoginContainer">
					{login ? (
						<>
							<img src={profileImage} alt="profile" />
							<p>
								Hello, {data?.name}
								<br />
								<Link>My account</Link> |{' '}
								<Link onClick={userLogout}>Log out</Link>
							</p>
						</>
					) : (
						<>
							<ProfileIcon />
							<p>
								<Link to="/login">Login</Link> or <Link>create</Link>
								<br />
								your account
							</p>
						</>
					)}
				</div>
			)}
			<div className="header-IconsContainer">
				<Link>
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
						<p>Hello. {login ? data?.name : ' Login'}</p>
					</div>
					<div className="lNav-Links">
						<div className="lNav-Links-card">
							<UserIcon />
							<p>Profile</p>
						</div>
						<div className="lNav-Links-card">
							<OrderIcon />
							<p>Orders</p>
						</div>
						<div className="lNav-Links-card">
							<FavoritesIcon />
							<p>Favorites</p>
						</div>
					</div>
					<div className="lNav-buttons">
						{login ? (
							<button onClick={userLogout}>LOG OUT</button>
						) : (
							<div>
								<button>LOG IN</button>
								<button>REGISTER</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
