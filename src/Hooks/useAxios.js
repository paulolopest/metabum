import axios from 'axios';
import React from 'react';

const useAxios = () => {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(null);

	const request = React.useCallback(async (url, options) => {
		let response;
		try {
			setError(null);
			setLoading(true);

			if (options.method === 'GET') {
				response = await axios.get(url, options);
			} else if (options.method === 'POST') {
				response = await axios.post(url, options);
			}

			if (response.ok === false) throw new Error(response.message);
		} catch (error) {
			response = null;
			setError(error.message);
		} finally {
			setData(response.data);
			setLoading(false);

			return { response };
		}
	}, []);

	return { data, error, loading, request };
};

export default useAxios;
