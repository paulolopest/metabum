import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';
import { GlobalContext } from '../Context/GlobalContext';

const ProtectedRoute = ({ children }) => {
	const { login, loading } = React.useContext(GlobalContext);

	const navigate = useNavigate();

	if (loading) return <Loading />;

	return login ? children : () => navigate('/login');
};

export default ProtectedRoute;
