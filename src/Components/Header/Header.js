import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './../../Context/GlobalContext';

const Header = () => {
	const { data } = React.useContext(GlobalContext);

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<p>Header</p>
			<Link to="/profile">{data ? data.name : null}</Link>
		</div>
	);
};

export default Header;
