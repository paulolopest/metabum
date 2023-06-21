import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './../Pages/HomePage/HomePage';
import ProductPage from './../Pages/ProductPage/ProductPage';
import GlobalStorage from '../Context/GlobalContext';
import Authentication from './../Pages/LoginPage/Authentication';
import Header from '../Components/Header/Header';

const RouterConfig = () => {
	return (
		<BrowserRouter>
			<GlobalStorage>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login/*" element={<Authentication />} />
					<Route path="/product" element={<ProductPage />} />
				</Routes>
			</GlobalStorage>
		</BrowserRouter>
	);
};

export default RouterConfig;
