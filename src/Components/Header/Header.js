import React from 'react';
import { ReactComponent as Menu } from '../../Assets/icons/menu.svg';
import { GlobalContext } from './../../Context/GlobalContext';
import Logo from '../../Assets/images/cabum-logo-bcfcd17b.png';
import profileImage from '../../Assets/images/profile_ninja-c2466b7f.png';
import { ReactComponent as UserIcon } from '../../Assets/icons/user.svg';
import { ReactComponent as OrderIcon } from '../../Assets/icons/truck.svg';
import { ReactComponent as FavoritesIcon } from '../../Assets/icons/heart.svg';
import CustomButton from './../Form/CustomButton/CustomButton';

const Header = () => {
	const [leftNav, setLeftNav] = React.useState(false);
	const { data, login, userLogout } = React.useContext(GlobalContext);

	const activeRightNav = React.useCallback(() => {
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
				<div className="hbg-menu" onClick={activeRightNav}>
					<Menu />
				</div>
				<img src={Logo} alt="logo"></img>
			</div>
			<div
				onClick={onClickOutside}
				className={leftNav ? `leftNav-container` : `displayNone`}
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
