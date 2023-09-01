import React from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';

const ProtectedRoute = ({ children }) => {
	const { login } = React.useContext(GlobalContext);

	return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
