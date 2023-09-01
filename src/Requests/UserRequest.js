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

	GET_USER_DEFAULT_ADDRESS = (token) => {
		return {
			url: `${BASE_URL}/user/default-address`,
			headers: {
				Authorization: token,
			},
		};
	};

	ADD_USER_ADDRESS = (token) => {
		return {
			url: `${BASE_URL}/user/address/add-address`,
			headers: {
				Authorization: token,
			},
		};
	};

	SET_USER_DEFAULT_ADDRESS = (token, zipCode) => {
		return {
			url: `${BASE_URL}/profile/set-default-address/${zipCode || `0`}`,
			headers: {
				Authorization: token,
			},
		};
	};

	DELETE_USER_ADDRESS = (token, id) => {
		return {
			url: `${BASE_URL}/user/address/delete/${id}`,
			headers: {
				Authorization: token,
			},
		};
	};

	UPDATE_USER_EMAIL = (token) => {
		return {
			url: `${BASE_URL}/profile/update-email`,
			headers: {
				Authorization: token,
			},
		};
	};
	UPDATE_USER_PASSWORD = (token) => {
		return {
			url: `${BASE_URL}/profile/change-password`,
			headers: {
				Authorization: token,
			},
		};
	};
}
