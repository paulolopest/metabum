import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import { ProductRequest } from '../../../Requests/ProductRequest';
import { ReactComponent as DownIcon } from '../../../Assets/icons/down-svgrepo-com.svg';
import { ReactComponent as ArchiveIcon } from '../../../Assets/icons/description-svgrepo-com.svg';

const DescriptionSection = ({ productId }) => {
	const productRequest = new ProductRequest();

	const [closeSection, setCloseSection] = React.useState(false);

	const { get, data } = useAxios();

	React.useEffect(() => {
		const { url } = productRequest.GET_PRODUCT_DESCRIPTION(productId);

		get(url);
	}, [productId]);

	const descriptions = data?.map((description) => (
		<div className="descriptionCard" key={description.id}>
			<h2>{description.title}</h2>
			<p>{description.description}</p>
		</div>
	));

	if (data)
		return (
			<div className="descriptionSection">
				<div className="descriptionContainer">
					<div className="dc-title">
						<div>
							<ArchiveIcon />
							<h1>Descrição do Produto</h1>
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

					<div className="descriptionArray">
						{!closeSection && descriptions}
					</div>
				</div>
			</div>
		);
};

export default DescriptionSection;
