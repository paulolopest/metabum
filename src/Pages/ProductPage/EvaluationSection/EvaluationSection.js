import React from 'react';
import useAxios from './../../../Hooks/useAxios';
import { formatDate } from '../../../Utils/Functions';
import { ProductRequest } from './../../../Requests/ProductRequest';
import { ReactComponent as EmptyStar } from '../../../Assets/icons/emptyStar.svg';
import { ReactComponent as DownIcon } from '../../../Assets/icons/down-svgrepo-com.svg';
import { ReactComponent as FullStar } from '../../../Assets/icons/star-svgrepo-com.svg';
import { ReactComponent as CloseIcon } from '../../../Assets/icons/up-chevron-svgrepo-com.svg';

const EvaluationSection = ({ productId }) => {
	const productRequest = new ProductRequest();

	const [closeSection, setCloseSection] = React.useState(false);

	const { get, data, post } = useAxios();

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_EVALUATIONS(productId);

		get(url);
	}, []);

	let evaluationSum = 0;
	data?.forEach((item) => {
		evaluationSum += item.rating;
	});
	let evaluationAverage = evaluationSum / data?.length;

	const starContainer = (rating) => {
		let stars = [];

		for (let i = 1; i <= 5; i++) {
			const StarComponent = i <= rating ? FullStar : EmptyStar;
			stars.push(<StarComponent key={i} />);
		}

		return <div className="rating">{stars}</div>;
	};

	const evaluationCard = data?.map((eva) => (
		<div className="eva-Card" key={eva.id}>
			<div className="eva-CardHeader">
				<p>{eva.user_name}</p>
				<div>
					{starContainer(eva.rating)}
					<span>Avaliado em {formatDate(eva.created_at)}</span>
				</div>
			</div>

			<div className="eva-cardContent">
				<span>
					<strong>Prós:</strong> {eva.pros}
				</span>
				<span>
					<strong>Contras:</strong> {eva.cons}
				</span>
				<p>{eva.description}</p>
			</div>
		</div>
	));

	if (data)
		return (
			<div className="evaluationSection">
				<div className="evaluationContainer">
					<div className="evaluationHeader">
						<div className="eva-title">
							<div>
								<FullStar />
								<h1>Avaliações dos usuários</h1>
							</div>

							<DownIcon
								onClick={() => setCloseSection(!closeSection)}
								style={{ transform: closeSection && 'rotate(180deg)' }}
							/>
						</div>

						<div className={`eva-average`}>
							<p>
								<span>
									{evaluationAverage.toFixed(2) === NaN
										? evaluationAverage.toFixed(2)
										: 0}
								</span>
								/5
							</p>

							<h5>({data.length} avaliações)</h5>
						</div>
					</div>
					<div
						className={`evaluationMain ${closeSection && 'displayNone'}`}
					>
						{evaluationCard}
					</div>
				</div>
			</div>
		);
};

export default EvaluationSection;
