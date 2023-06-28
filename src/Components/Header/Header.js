import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './../../Context/GlobalContext';

const Header = () => {
	const { data, login, userLogout } = React.useContext(GlobalContext);

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<p>Header</p>
			<div>
				{login ? (
					<Link to="/profile">{data?.name}</Link>
				) : (
					<Link to="/login">Login</Link>
				)}

				<h1 onClick={userLogout}>Log out</h1>
			</div>
		</div>
	);
};

export default Header;
