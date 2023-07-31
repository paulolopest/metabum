import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import CartStorage from '../Context/CartContext';
import Header from '../Components/Header/Header';
import UserPage from '../Pages/UserPage/UserPage';
import HomePage from './../Pages/HomePage/HomePage';
import GlobalStorage from '../Context/GlobalContext';
import ProductPage from './../Pages/ProductPage/ProductPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './../Pages/LoginPage/Authentication';
import ProductCatalog from './../Pages/ProductCatalog/ProductCatalog';

const RouterConfig = () => {
	return (
		<BrowserRouter>
			<GlobalStorage>
				<CartStorage>
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login/*" element={<Authentication />} />
						<Route path="/products/" element={<HomePage />} />
						<Route path="/product/:id" element={<ProductPage />} />
						<Route path="/catalog/*" element={<ProductCatalog />} />
						<Route
							path="/my-profile/*"
							element={
								<ProtectedRoute>
									<UserPage />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</CartStorage>
			</GlobalStorage>
		</BrowserRouter>
	);
};

export default RouterConfig;
