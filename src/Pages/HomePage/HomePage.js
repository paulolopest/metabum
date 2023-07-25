import React from 'react';
import { banners, miniBanners } from './../../Utils/Extra';
import { ReactComponent as NextIcon } from '../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as PreviousIcon } from '../../Assets/icons/previous-svgrepo-com.svg';
import { ReactComponent as StarIcon } from '../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as ThunderIcon } from '../../Assets/icons/thunder-svgrepo-com.svg';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import MainCarousel from './CarouselProduct/CarouselProduct';
import DepartmentsSection from './DepartmentsSection/DepartmentsSection';
import { ProductRequest } from '../../Requests/ProductRequest';

const HomePage = () => {
	const [ref, { height }] = useMeasure();
	const [dragInitialPosition, setDragInitialPosition] = React.useState(0);
	const [bannerIndex, setBannerIndex] = React.useState(0);
	const [prev, setPrev] = React.useState(bannerIndex);
	const productRequest = new ProductRequest();

	let direction = bannerIndex > prev ? 'increasing' : 'decreasing';

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
		bannerIndex === 0 ? setBannerIndex(4) : setBannerIndex(bannerIndex - 1);
	};

	const verifyDrag = (e, info) => {
		if (info.point.x > dragInitialPosition) {
			clickNext();
		} else {
			clickBack();
		}
	};

	React.useEffect(() => {
		if (window.scrollY < height) {
			const timer = setInterval(clickNext, 5000);
			return () => clearInterval(timer);
		}
	}, [bannerIndex]);

	return (
		<div
			className="homePage-Section"
			style={{ backgroundColor: banners[bannerIndex].color }}
		>
			<div className="homePage-Container">
				<motion.div
					ref={ref}
					initial={{ x: direction === 'increasing' ? 20 : -20 }}
					animate={{ x: 0 }}
					onDragStart={(e, info) => setDragInitialPosition(info.point.x)}
					onDragEnd={verifyDrag}
					key={bannerIndex}
					drag="x"
					dragElastic={0.1}
					dragConstraints={{ right: 0, left: 0 }}
					style={{
						backgroundImage: `url(${banners[bannerIndex].url})`,
					}}
					className="hp-banners"
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

				<div className="homePage-content">
					<MainCarousel request={productRequest.GET_PRODUCTS().url} />

					<div className="mini-banners">
						<img
							alt="mini banner"
							draggable={false}
							src={miniBanners[0].url}
						/>
						<img
							alt="mini banner"
							draggable={false}
							src={miniBanners[1].url}
						/>
					</div>

					<MainCarousel
						svgIcon={<StarIcon />}
						title={<p>Destaques ninjas</p>}
						request={productRequest.GET_PRODUCTS().url}
					/>

					<DepartmentsSection />

					<div className="mini-banners">
						<img
							alt="mini banner"
							draggable={false}
							src={miniBanners[2].url}
						/>
						<img
							alt="mini banner"
							draggable={false}
							src={miniBanners[3].url}
						/>
					</div>

					<MainCarousel
						svgIcon={<ThunderIcon />}
						title={<p>Acabaram de chegar</p>}
						request={productRequest.GET_PRODUCTS().url}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
