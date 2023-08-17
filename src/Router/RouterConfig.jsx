import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import CartStorage from '../Context/CartContext';
import Header from '../Components/Header/Header';
import HomePage from '../Pages/HomePage/HomePage';
import GlobalStorage from '../Context/GlobalContext';
import UserRoutes from '../Pages/UserPage/UserRoutes';
import ProductPage from '../Pages/ProductPage/ProductPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from '../Pages/LoginPage/Authentication';
import ProductCatalog from '../Pages/ProductCatalog/ProductCatalog';
import CartPage from '../Pages/CartPage/CartPage';
import PopUp from '../Components/PopUp/PopUp';

const RouterConfig = () => {
	return (
		<BrowserRouter>
			<GlobalStorage>
				<CartStorage>
					<PopUp/>
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
									<UserRoutes />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/cart/*"
							element={
								<ProtectedRoute>
									<CartPage />
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
