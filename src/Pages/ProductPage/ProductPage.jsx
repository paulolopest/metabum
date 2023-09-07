import React from 'react';
import { useParams } from 'react-router-dom';
import BuySection from './BuySection/BuySection';
import DescriptionSection from './DescriptionSection/DescriptionSection';
import TechnicalInformationSection from './TechnicalInformationSection/TechnicalInfoSection';
import EvaluationSection from './EvaluationSection/EvaluationSection';

const ProductPage = () => {
	const { id } = useParams();

	const [productId, setProductId] = React.useState(id);

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [productId]);

	return (
		<div className="productPage">
			<BuySection productId={productId} setProductId={setProductId} />
			<DescriptionSection productId={productId} />
			<TechnicalInformationSection productId={productId} />
			<EvaluationSection productId={productId} />
		</div>
	);
};
export default ProductPage;
