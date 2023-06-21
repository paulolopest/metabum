import React from 'react';
import { GET_USER } from '../../Requests/UserRequest';
import useAxios from '../../Hooks/useAxios';

const Header = () => {
	const { get, data, error, loading } = useAxios();

	React.useEffect(() => {
		const token = window.localStorage.getItem('metabumtoken');
		const { url, options } = GET_USER(token);

		get(url, options);
	}, []);

	if (data && data)
		return (
			<div>
				<p>Header</p>
				<p>{data.name}</p>
			</div>
		);
};

export default Header;
