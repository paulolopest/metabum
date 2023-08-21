import React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { GlobalContext } from '../../Context/GlobalContext';
import SiteLogo from '../../Assets/images/metabumbanner.png';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const Authentication = () => {
	const { login } = React.useContext(GlobalContext);

	if (login === true) return <Navigate to="/" />;

	return (
		<div>
			<div className="authenticationHeader">
				<Link to="/">
					<img src={SiteLogo} alt="logo" />
				</Link>
			</div>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};

export default Authentication;
