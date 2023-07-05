import axios from 'axios';
import React from 'react';

const useAxios = () => {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(null);

	const get = React.useCallback(async (url, config) => {
		let res;
		try {
			setError(null);
			setLoading(true);

			res = await axios.get(url, config);

			setData(res.data);
		} catch (error) {
			setData(null);
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}, []);

	const post = React.useCallback(async (url, body, config) => {
		try {
			setError(null);
			setLoading(true);

			await axios.post(url, body, config);
		} catch (error) {
			setData(null);
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteAxios = React.useCallback(async (url, config) => {
		try {
			setError(null);
			setLoading(true);

			await axios.delete(url, config);
		} catch (error) {
			setData(null);
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}, []);

	const put = React.useCallback(async (url, data, config) => {
		try {
			setError(null);
			setLoading(true);

			await axios.put(url, data, config);
		} catch (error) {
			setData(null);
			setError(error.response.data);
			console.log(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}, []);

	return { data, error, loading, get, post, put, deleteAxios };
};

export default useAxios;
