import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import PopUp from '../Components/PopUp/PopUp';
import CartStorage from '../Context/CartContext';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import HomePage from '../Pages/HomePage/HomePage';
import CartPage from '../Pages/CartPage/CartPage';
import GlobalStorage from '../Context/GlobalContext';
import UserRoutes from '../Pages/UserPage/UserRoutes';
import ProductPage from '../Pages/ProductPage/ProductPage';
import Authentication from '../Pages/LoginPage/Authentication';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './../Pages/NotFoundPage/NotFoundPage';
import ProductCatalog from '../Pages/ProductCatalog/ProductCatalog';
import CustomButton from '../Components/Form/CustomButton/CustomButton';
import { ReactComponent as UpIcon } from '../Assets/icons/up-chevron-svgrepo-com.svg';

const RouterConfig = () => {
	return (
		<BrowserRouter>
			<GlobalStorage>
				<CartStorage>
					<PopUp />

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
						<Route path="*" element={<NotFoundPage />} />
					</Routes>

					<CustomButton
						onClick={() =>
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}
						className="goUpButton"
					>
						<UpIcon />
					</CustomButton>

					<Footer />
				</CartStorage>
			</GlobalStorage>
		</BrowserRouter>
	);
};

export default RouterConfig;
