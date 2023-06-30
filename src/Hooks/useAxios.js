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
		let res;
		try {
			setError(null);
			setLoading(true);

			res = await axios.post(url, body, config);

			setData(res.data);
		} catch (error) {
			setData(null);
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteAxios = React.useCallback(async (url, config) => {
		let res;
		try {
			setError(null);
			setLoading(true);

			res = await axios.delete(url, config);

			setData(res.data);
		} catch (error) {
			setData(null);
			setError(error.response.data);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}, []);

	return { data, error, loading, get, post, deleteAxios };
};

export default useAxios;
