const BASE_URL = 'https://back-metabum.vercel.app';

export class UserRequest {
	USER_SIGNUP = (body) => {
		return {
			url: `${BASE_URL}/signup`,
			options: {
				method: 'POST',
				body,
			},
		};
	};

	USER_LOGIN = () => {
		return {
			url: `${BASE_URL}/login`,
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
}
