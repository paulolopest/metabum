import React from 'react';
import { motion } from 'framer-motion';
import useAxios from '../../../Hooks/useAxios';
import useMeasure from 'react-use-measure';
import { ProductRequest } from './../../../Requests/ProductRequest';

import { Navigate } from 'react-router-dom';
import HPProductCard from './HPProductCard';

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
		</div>
	);
};

export default MainCarousel;
