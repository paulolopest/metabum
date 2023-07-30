import React from 'react';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Loading from '../../Components/Loading/Loading';
import { GlobalContext } from '../../Context/GlobalContext';
import SiteLogo from '../../Assets/images/metabumbanner.png';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

const Authentication = () => {
	const { login, loading } = React.useContext(GlobalContext);

	if (login === true) return <Navigate to="/" />;

	// if (loading) return <Loading />;
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
				{/* <Route path="*" element={<NotFoundError />} /> */}
			</Routes>
		</div>
	);
};

export default Authentication;
