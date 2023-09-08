import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import Loading from '../../../Components/Loading/Loading';
import { ProductRequest } from '../../../Requests/ProductRequest';
import { ReactComponent as DownIcon } from '../../../Assets/icons/down-svgrepo-com.svg';
import { ReactComponent as ExclamationIcon } from '../../../Assets/icons/exclamation-mark-circle-f-svgrepo-com.svg';

const TechnicalInfoSection = ({ productId }) => {
	const productRequest = new ProductRequest();
	const { data, get, loading } = useAxios();

	const [closeSection, setCloseSection] = React.useState(false);

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_TECHNICAL_INFO(productId);

		get(url);
	}, [get, productId]);

	const formatTechInfo = (info) => {
		const techInfoObj = JSON.parse(info);

		return Object.entries(techInfoObj).map(([key, value]) => (
			<p key={key}>
				- {key}: {value}
			</p>
		));
	};

	const techInfoMap = data?.map((ti) => {
		return (
			<div className="ti-card" key={ti.id}>
				<h2>{ti.title}</h2>

				{formatTechInfo(ti.info)}
			</div>
		);
	});

	if (loading) return <Loading />;
	if (data)
		return (
			<div className="ti-section">
				<div className="ti-container">
					<div className="tic-title">
						<div>
							<ExclamationIcon />
							<h1>Informações Técnicas</h1>
						</div>

						<DownIcon
							onClick={() => setCloseSection(!closeSection)}
							style={{
								transform: closeSection && 'rotate(180deg)',
								width: '2.5rem',
								height: '2.5rem',
							}}
						/>
					</div>

					{!closeSection && techInfoMap}
				</div>
			</div>
		);
};

export default TechnicalInfoSection;
