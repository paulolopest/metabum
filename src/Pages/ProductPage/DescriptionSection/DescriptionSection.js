import React from 'react';
import { ReactComponent as ArchiveIcon } from '../../../Assets/icons/description-svgrepo-com.svg';
import { ProductRequest } from '../../../Requests/ProductRequest';
import useAxios from './../../../Hooks/useAxios';

const DescriptionSection = ({ id }) => {
	const productRequest = new ProductRequest();

	const { get, data } = useAxios();

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_DESCRIPTION(id);

		get(url);
	}, [id]);

	const descriptions = data?.map((description) => (
		<div className="descriptionCard" key={description.id}>
			<h2>{description.title}</h2>
			<p>{description.description}</p>
		</div>
	));

	// if (data)
	return (
		<div className="descriptionSection">
			<div className="descriptionContainer">
				<div>
					<ArchiveIcon />
					<h1>Product Description</h1>
				</div>

				<div className="descriptionArray">{descriptions}</div>
			</div>
		</div>
	);
};

export default DescriptionSection;
