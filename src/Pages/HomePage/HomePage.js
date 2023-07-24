import React from 'react';
import { banners } from './../../Utils/Extra';
import { ReactComponent as NextIcon } from '../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as PreviousIcon } from '../../Assets/icons/previous-svgrepo-com.svg';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

const HomePage = () => {
	const [bannerIndex, setBannerIndex] = React.useState(0);
	const [prev, setPrev] = React.useState(bannerIndex);
	const [ref, { height }] = useMeasure();

	const clickNext = () => {
		if (bannerIndex === 4) {
			setBannerIndex(0);
			setPrev(bannerIndex);
		} else {
			setBannerIndex(bannerIndex + 1);
			setPrev(bannerIndex);
		}
	};

	const clickBack = () => {
		bannerIndex === 4 ? setBannerIndex(0) : setBannerIndex(bannerIndex - 1);
	};

	let direction = bannerIndex > prev ? 'increasing' : 'decreasing';

	console.log(direction);

	return (
		<div
			className="homePage-Section"
			style={{ backgroundColor: banners[bannerIndex].color }}
		>
			<div className="homePage-Container">
				<motion.div
					ref={ref}
					className="hp-banners"
					style={{
						backgroundImage: `url(${banners[bannerIndex].url})`,
					}}
					initial={{ x: direction === 'increasing' ? 20 : -20 }}
					animate={{ x: 0 }}
					key={bannerIndex}
				>
					<button onClick={clickBack} className="hp-bannerNext">
						<PreviousIcon />
					</button>
					<button onClick={clickNext} className="hp-bannerPrevious">
						<NextIcon />
					</button>
				</motion.div>

				<div
					style={{
						backgroundColor: banners[bannerIndex].color,
						height: height,
					}}
				/>
				<div>a</div>
			</div>
		</div>
	);
};

export default HomePage;
