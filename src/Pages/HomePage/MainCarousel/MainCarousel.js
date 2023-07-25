import React from 'react';
import { motion } from 'framer-motion';
import HPProductCard from './HPProductCard';
import useAxios from '../../../Hooks/useAxios';
import { ProductRequest } from './../../../Requests/ProductRequest';
import { ReactComponent as NextIcon } from '../../../Assets/icons/next-svgrepo-com.svg';

const MainCarousel = () => {
	const { data, get } = useAxios();
	const productRequest = new ProductRequest();
	const [isDragging, setIsDragging] = React.useState(false);

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCTS();

		get(url);
	}, []);

	const productMap = data?.map((product) => (
		<HPProductCard
			key={product.id}
			product={product}
			isDragging={isDragging}
		/>
	));

	return (
		<div className="mc-container">
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

export default MainCarousel;
