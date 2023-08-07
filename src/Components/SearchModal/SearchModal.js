import React from 'react';
import useAxios from '../../Hooks/useAxios';
import { ProductRequest } from './../../Requests/ProductRequest';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ word, searchModal, setSearchModal }) => {
	const productRequest = new ProductRequest();

	const search = useAxios();
	const navigate = useNavigate();

	React.useEffect(() => {
		const time = setTimeout(() => {
			const { url } = productRequest.SEARCH_PRODUCTS(word, '', '', '', 5);

			if (word) setSearchModal(true);

			search.get(url);
		}, 500);

		return () => clearTimeout(time);
	}, [word]);

	const handleClick = (id) => {
		setSearchModal(false);
		navigate(`/product/${id}`);
	};

	const searchModalMap = search.data?.map((product) => (
		<div
			onClick={() => handleClick(product.id)}
			className="search_card"
			key={product.id}
		>
			<img src={product.small_src} alt={product.name} />
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
