import React from 'react';
import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import { banners, miniBanners } from '../../Utils/Extra';
import MainCarousel from './CarouselProduct/CarouselProduct';
import { ProductRequest } from '../../Requests/ProductRequest';
import DepartmentsSection from './DepartmentsSection/DepartmentsSection';
import { ReactComponent as NextIcon } from '../../Assets/icons/next-svgrepo-com.svg';
import { ReactComponent as StarIcon } from '../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as ThunderIcon } from '../../Assets/icons/thunder-svgrepo-com.svg';
import { ReactComponent as PreviousIcon } from '../../Assets/icons/previous-svgrepo-com.svg';

const HomePage = () => {
	const [dragInitialPosition, setDragInitialPosition] = React.useState(0);
	const [isDragging, setIsDragging] = React.useState(false);
	const [bannerIndex, setBannerIndex] = React.useState(0);
	const [prev, setPrev] = React.useState(bannerIndex);
	const [loading, setLoading] = React.useState(true);

	const navigate = useNavigate();
	const [ref, { height }] = useMeasure();
	let direction = bannerIndex > prev ? 'increasing' : 'decreasing';

	const productRequest = new ProductRequest();

	const clickNext = (e) => {
		if (bannerIndex === banners.length - 1) {
			setBannerIndex(0);
			setPrev(bannerIndex);
		} else {
			setBannerIndex(bannerIndex + 1);
			setPrev(bannerIndex);
		}
	};

	const clickBack = () => {
		bannerIndex === 0
			? setBannerIndex(banners.length - 1)
			: setBannerIndex(bannerIndex - 1);
	};

	const handleDragStart = (e, info) => {
		setDragInitialPosition(info.point.x);
		setIsDragging(true);
	};

	const verifyDrag = (e, info) => {
		if (info.point.x > dragInitialPosition) {
			clickNext();
		} else {
			clickBack();
		}
	};

	const handleDragEnd = (e, info) => {
		setIsDragging(false);
		verifyDrag(e, info);
	};

	React.useEffect(() => {
		if (loading) {
			window.scrollTo(0, 0);
			document.body.classList.add('loading');
		} else {
			document.body.classList.remove('loading');
		}
		window.scrollTo(0, 0);
		setTimeout(() => setLoading(false), 1000);
	}, [loading]);

	React.useEffect(() => {
		if (window.scrollY < height) {
			const timer = setInterval(clickNext, 5000);
			return () => clearInterval(timer);
		}
	}, [bannerIndex]);

	if (loading) return <Loading />;
	// if (data)
	return (
		<>
			<div
				className="homePage-Section"
				style={{
					backgroundColor: banners[bannerIndex].color,
				}}
			>
				<div className="homePage-Container">
					<motion.div
						ref={ref}
						initial={{ x: direction === 'increasing' ? 20 : -20 }}
						animate={{ x: 0 }}
						onDragStart={handleDragStart}
						onDrag={() => setIsDragging(true)}
						onDragEnd={handleDragEnd}
						drag="x"
						dragElastic={0}
						dragConstraints={{ right: 0, left: 0 }}
						className="hp-banners"
						style={{ backgroundColor: banners[bannerIndex].color }}
					>
						<button onClick={clickBack} className="hp-bannerNext">
							<PreviousIcon />
						</button>

						<motion.img
							onDrag={() => setIsDragging(true)}
							onDragEnd={() => setIsDragging(false)}
							draggable="false"
							src={banners[bannerIndex].url}
							alt=""
							onClick={
								!isDragging
									? (e) => {
											navigate(
												`/catalog/:${banners[bannerIndex].word}`
											);
									  }
									: null
							}
						/>

						<button onClick={clickNext} className="hp-bannerPrevious">
							<NextIcon />
						</button>
					</motion.div>

					<div className="homePage-content">
						<MainCarousel
							request={
								productRequest.SEARCH_PRODUCTS(
									'ptglfavorites',
									'',
									'',
									'',
									20
								).url
							}
							word="ptglfavorites"
						/>

						<div className="mini-banners">
							<img
								alt="mini banner"
								draggable={false}
								src={miniBanners[0].url}
								onClick={(e) => {
									e.preventDefault();
									navigate(`/catalog/:${miniBanners[0].word}`);
								}}
							/>
							<img
								alt="mini banner"
								draggable={false}
								src={miniBanners[1].url}
								onClick={(e) => {
									e.preventDefault();
									navigate(`/catalog/:${miniBanners[1].word}`);
								}}
							/>
						</div>

						<MainCarousel
							svgIcon={<StarIcon />}
							title={<p>Destaques ninjas</p>}
							request={
								productRequest.SEARCH_PRODUCTS(
									'hardware',
									'',
									'',
									'',
									20
								).url
							}
							word="hardware"
						/>

						<DepartmentsSection />

						<MainCarousel
							svgIcon={<ThunderIcon />}
							title={<p>Faça seu jogo</p>}
							request={
								productRequest.SEARCH_PRODUCTS('games', '', '', '', 20)
									.url
							}
							word="games"
						/>

						<div className="mini-banners">
							<img
								alt="mini banner"
								draggable={false}
								src={miniBanners[2].url}
								onClick={(e) => {
									e.preventDefault();
									navigate(`/catalog/:${miniBanners[2].word}`);
								}}
							/>
							<img
								alt="mini banner"
								draggable={false}
								src={miniBanners[3].url}
								onClick={(e) => {
									e.preventDefault();
									navigate(`/catalog/:${miniBanners[3].word}`);
								}}
							/>
						</div>

						<MainCarousel
							svgIcon={<ThunderIcon />}
							title={<p>Faça seu jogo</p>}
							request={
								productRequest.GET_PRODUCTS('games', '', '', '', 20).url
							}
							word="games"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
