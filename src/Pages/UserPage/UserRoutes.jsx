import React from 'react';
import UserPage from './UserPage';
import UserDataPage from './UserDataPage/UserDataPage';
import { Route, Routes } from 'react-router-dom';

const UserRoutes = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<UserPage />} />
				<Route path="my-data" element={<UserDataPage />} />
			</Routes>
		</div>
	);
};

export default UserRoutes;
