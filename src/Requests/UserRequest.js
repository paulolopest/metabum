const BASE_URL = 'https://back-metabum.vercel.app';

export class UserRequest {
	USER_SIGNUP = (body) => {
		return {
			url: `${BASE_URL}/signup`,
			options: {
				body,
			},
		};
	};

	USER_LOGIN = () => {
		return {
			url: `${BASE_URL}/login`,
		};
	};

	TOKEN_VALIDATE = (token) => {
		return {
			url: `${BASE_URL}/token/validate-token`,
			body: {
				token: token,
			},
		};
	};

	GET_USER = (token) => {
		return {
			url: `${BASE_URL}/profile`,
			options: {
				headers: {
					Authorization: token,
				},
			},
		};
	};

	GET_USER_ADDRESS = (token) => {
		return {
			url: `${BASE_URL}/user/address/`,
			headers: {
				Authorization: token,
			},
		};
	};
}
