import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserRequest } from '../Requests/UserRequest';

export const GlobalContext = React.createContext();

const userRequest = new UserRequest();

const GlobalStorage = ({ children }) => {
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [login, setLogin] = React.useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	const userLogout = React.useCallback(async () => {
		setData(null);
		setError(null);
		setLoading(false);
		setLogin(false);

		window.localStorage.removeItem('metabumtoken');

		navigate('/login');
	}, [navigate]);

	const token = window.localStorage.getItem('metabumtoken');

	const getUser = async () => {
		try {
			const token = window.localStorage.getItem('metabumtoken');
			const { url, options } = userRequest.GET_USER(token);

			let req = await axios.get(url, options);

			setData(req.data);
			setLogin(true);
		} catch (error) {
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	const userLogin = async (email, password) => {
		let req;
		try {
			setError(null);
			setLoading(true);

			const body = {
				email: email,
				password: password,
			};

			const { url } = userRequest.USER_LOGIN();
			req = await axios.post(url, body);

			window.localStorage.setItem('metabumtoken', req.data);

			setLogin(true);
			navigate('/');
		} catch (error) {
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		const autoLogin = async () => {
			const token = window.localStorage.getItem('metabumtoken');
			if (token) {
				try {
					setError(null);
					setLoading(true);

					const { url, body } = userRequest.TOKEN_VALIDATE(token);
					const res = await axios.post(url, body, null);

					if (res.status !== 200) throw new Error('Invalid credentials');

					setLogin(true);
					await getUser(token);
				} catch (error) {
					// await userLogout();
				} finally {
					setLoading(false);
				}
			}
		};
		autoLogin();
	}, [userLogout]);

	return (
		<GlobalContext.Provider
			value={{
				userLogin,
				userLogout,
				getUser,
				data,
				loading,
				error,
				login,
				token,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalStorage;
