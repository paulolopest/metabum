const BASE_URL = 'https://back-metabum.vercel.app';

export const USER_LOGIN = (body) => {
	return {
		url: `${BASE_URL}/login`,
		body,
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
