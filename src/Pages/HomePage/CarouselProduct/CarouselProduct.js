import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import useAxios from '../../../Hooks/useAxios';
import Loading from './../../../Components/Loading/Loading';
import { ReactComponent as NextIcon } from '../../../Assets/icons/next-svgrepo-com.svg';

const CarouselProduct = ({ request, title, svgIcon }) => {
	const { data, get, loading } = useAxios();
	const [isDragging, setIsDragging] = React.useState(false);

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
					dragConstraints={{ right: 0, left: `18rem * 20` }}
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