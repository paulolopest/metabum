import React from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const ProtectedRoute = ({ children }) => {
	const { login, loading } = React.useContext(GlobalContext);

	const navigate = useNavigate();

	if (loading) return <Loading />;

	if (!login) {
		navigate('/login');
	} else {
		return children;
	}
};

export default ProtectedRoute;
