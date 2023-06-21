const BASE_URL = 'https://back-metabum.vercel.app';

export const USER_SIGNUP = (body) => {
	return {
		url: `${BASE_URL}/signup`,
		options: {
			method: 'POST',
			body,
		},
	};
};

export const USER_LOGIN = () => {
	return {
		url: `${BASE_URL}/login`,
	};
};

export const GET_USER = (token) => {
	return {
		url: `${BASE_URL}/profile`,
		options: {
			headers: {
				Authorization: token,
			},
		},
	};
};
