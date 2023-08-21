import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="notFound">
			<p>Error 404: Página não encontrada</p>
			<button onClick={() => navigate('/')}>Continuar comprando</button>
		</div>
	);
};

export default NotFoundPage;
