import React from 'react';
import useAxios from './../../../Hooks/useAxios';
import { ProductRequest } from './../../../Requests/ProductRequest';
import { ReactComponent as ExclamationIcon } from '../../../Assets/icons/exclamation-mark-circle-f-svgrepo-com.svg';

const TechnicalInfoSection = ({ productId }) => {
	const productRequest = new ProductRequest();
	const { data, get } = useAxios();

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_TECHNICAL_INFO(productId);

		get(url);
	}, [get, productId]);

	const formatTechInfo = (info) => {
		const techInfoObj = JSON.parse(info);

		return Object.entries(techInfoObj).map(([key, value]) => (
			<p key={key}>
				- {key}: {value}
			</p>
		));
	};

	const techInfoMap = data?.map((ti) => {
		return (
			<div className="ti-card" key={ti.id}>
				<h3>{ti.title}</h3>

				{formatTechInfo(ti.info)}
			</div>
		);
	});

	return (
		<div className="ti-section">
			<div className="ti-container">
				<div>
					<ExclamationIcon />
					<h1>Technical Information</h1>
				</div>

				{techInfoMap}
			</div>
		</div>
	);
};

export default TechnicalInfoSection;
