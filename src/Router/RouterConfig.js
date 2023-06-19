import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './../Pages/HomePage/HomePage';
import ProductPage from './../Pages/ProductPage/ProductPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import GlobalStorage from '../Context/GlobalContext';

const RouterConfig = () => {
	return (
		<BrowserRouter>
			<GlobalStorage>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/product" element={<ProductPage />} />
				</Routes>
			</GlobalStorage>
		</BrowserRouter>
	);
};

export default RouterConfig;
