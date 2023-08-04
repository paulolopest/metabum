import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { ProductRequest } from './../../Requests/ProductRequest';

const SearchModal = ({ word, searchModal, setSearchModal }) => {
	const productRequest = new ProductRequest();

	const search = useAxios();

	React.useEffect(() => {
		const time = setTimeout(() => {
			const { url } = productRequest.SEARCH_PRODUCTS(word, '', '', '', 5);

			if (word) setSearchModal(true);

			search.get(url);
		}, 500);

		return () => clearTimeout(time);
	}, [word]);

	const searchModalMap = search.data?.map((product) => (
		<div key={product.id}>
			<p>{product.name}</p>
		</div>
	));

	if (search.data)
		return (
			<div className={searchModal ? 'searchModalContainer' : 'displayNone'}>
				{searchModalMap}
			</div>
		);
};

export default SearchModal;
