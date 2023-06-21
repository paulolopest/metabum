import React from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const Authentication = () => {
	const { login } = React.useContext(GlobalContext);

	if (login === true) return <Navigate to="/" />;

	return (
		<section>
			<div className="authRoutes-ctr">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					{/* <Route path="*" element={<NotFoundError />} /> */}
				</Routes>
			</div>
		</section>
	);
};

export default Authentication;
