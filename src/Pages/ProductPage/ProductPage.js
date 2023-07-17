import { useParams } from 'react-router-dom';
import BuySection from './BuySection/BuySection';
import DescriptionSection from './DescriptionSection/DescriptionSection';

const ProductPage = () => {
	const { id } = useParams();

	return (
		<div className="productPage">
			<BuySection id={id} />
			<DescriptionSection id={id} />
		</div>
	);
};
export default ProductPage;
