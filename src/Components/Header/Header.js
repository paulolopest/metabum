import React from 'react';
import { ReactComponent as Menu } from '../../Assets/icons/menu.svg';
import { GlobalContext } from './../../Context/GlobalContext';
import Logo from '../../Assets/images/cabum-logo-bcfcd17b.png';

const Header = () => {
	const [rightNav, setRightNav] = React.useState(false);
	const { data, login, userLogout } = React.useContext(GlobalContext);

	const activeRightNav = React.useCallback(() => {
		setRightNav(!rightNav);
	}, [rightNav]);

	return (
		<div className="headerContainer">
			<div className="headerLinks">
				<div className="hbg-menu" onClick={activeRightNav}>
					<Menu />
				</div>
				<img src={Logo} alt="logo"></img>
			</div>
			<div className={rightNav ? `header-rightNav` : `displayNone`}>
				<ul>
					<li>A</li>
					<li>A</li>
					<li>A</li>
					<li>A</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
