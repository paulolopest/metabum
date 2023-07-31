import React from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { login } = React.useContext(GlobalContext);

	return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
