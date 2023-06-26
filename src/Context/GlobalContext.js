import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRequest } from '../Requests/UserRequest';
import axios from 'axios';

export const GlobalContext = React.createContext();
const userRequest = new UserRequest();

const GlobalStorage = ({ children }) => {
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [login, setLogin] = React.useState(null);

	const token = window.localStorage.getItem('metabumtoken');
	const navigate = useNavigate();

	const userLogout = React.useCallback(async () => {
		setData(null);
		setError(null);
		setLoading(false);
		setLogin(false);

		window.localStorage.removeItem('metabumtoken');

		navigate('/login');
	}, [navigate]);

	const getUser = async () => {
		const { url, options } = userRequest.GET_USER(token);
		let req = await axios.get(url, options);

		setData(req.data);
		setLogin(true);
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

			navigate('/');
		} catch (error) {
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		// const autoLogin = async () => {
		// 	if (token) {
		// 		try {
		// 			setError(null);
		// 			setLoading(true);
		// 			// const {url, options}
		// 		} catch (error) {}
		// 	}
		// };
		if (token) {
			getUser(token);
		}
	}, [token]);

	return (
		<GlobalContext.Provider
			value={{ userLogin, userLogout, getUser, data, loading, error, login }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalStorage;
