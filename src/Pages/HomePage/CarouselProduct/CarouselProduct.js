import React from 'react';
import { motion } from 'framer-motion';
import useAxios from '../../../Hooks/useAxios';
import useMedia from './../../../Hooks/useMedia';
import Loading from './../../../Components/Loading/Loading';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import { ReactComponent as NextIcon } from '../../../Assets/icons/next-svgrepo-com.svg';

const CarouselProduct = ({ request, title, svgIcon }) => {
	const [isDragging, setIsDragging] = React.useState(false);

	const { data, get, loading } = useAxios();

	const mobileScreen = useMedia('(max-width: 600px)');

	React.useEffect(() => {
		get(request);
	}, []);

	const productMap = data?.map((product) => (
		<ProductCard key={product.id} product={product} isDragging={isDragging} />
	));

	if (loading) return <Loading />;
	if (data)
		return (
			<div className="mc-container">
				<div className="mc-carouselTitle">
					{svgIcon}
					{title}
				</div>
				<motion.div
					drag="x"
					dragConstraints={{
						right: 0,
						left: !mobileScreen ? -10 * 165 : -10 * 289,
					}}
					onDrag={() => setIsDragging(true)}
					onDragEnd={() => setIsDragging(false)}
					className="mc-carousel"
				>
					{productMap}
				</motion.div>

				<button className="seeMore-button">
					ver todos
					<NextIcon />
				</button>
			</div>
		);
};

export default CarouselProduct;
