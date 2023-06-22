import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router-dom';
import { UserRequest } from './../../Requests/UserRequest';

const userRequest = new UserRequest();

const Header = () => {
	const { get, data } = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, options } = userRequest.GET_USER(token);

		get(url, options);
	}, [get]);

	if (data && data)
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<p>Header</p>
				<Link to="/profile">{data.name}</Link>
			</div>
		);
};

export default Header;
