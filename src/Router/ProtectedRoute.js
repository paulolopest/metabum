import React from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const ProtectedRoute = ({ children }) => {
	const { login, loading } = React.useContext(GlobalContext);

	if (loading) return <Loading />;

	if (login) {
		return children;
	} else {
		<Navigate to="/login" />;
	}
};

export default ProtectedRoute;
