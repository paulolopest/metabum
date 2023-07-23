import React from 'react';
import { useParams } from 'react-router-dom';
import BuySection from './BuySection/BuySection';
import DescriptionSection from './DescriptionSection/DescriptionSection';
import TechnicalInformationSection from './TechnicalInformationSection/TechnicalInfoSection';

const ProductPage = () => {
	const { id } = useParams();

	const [productId, setProductId] = React.useState(id);

	return (
		<div className="productPage">
			<BuySection productId={productId} setProductId={setProductId} />
			<DescriptionSection productId={productId} />
			<TechnicalInformationSection productId={productId} />
		</div>
	);
};
export default ProductPage;
