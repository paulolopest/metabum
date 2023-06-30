import React from 'react';
import Header from '../Components/Header/Header';
import HomePage from './../Pages/HomePage/HomePage';
import GlobalStorage from '../Context/GlobalContext';
import ProductPage from './../Pages/ProductPage/ProductPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './../Pages/LoginPage/Authentication';

const RouterConfig = () => {
	return (
		<BrowserRouter>
			<GlobalStorage>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login/*" element={<Authentication />} />
					<Route path="/products/" element={<HomePage />} />
					<Route path="/product/:id" element={<ProductPage />} />
				</Routes>
			</GlobalStorage>
		</BrowserRouter>
	);
};

export default RouterConfig;
