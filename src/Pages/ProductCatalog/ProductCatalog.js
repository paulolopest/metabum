import React from 'react';
import useForm from '../../Hooks/useForm';
import useAxios from '../../Hooks/useAxios';
import { useParams } from 'react-router-dom';
import { ProductRequest } from '../../Requests/ProductRequest';
import CustomInput from './../../Components/Form/CustomInput/CustomInput';
import { ReactComponent as OrderIcon } from '../../Assets/icons/order.svg';
import { ReactComponent as IconList } from '../../Assets/icons/iconList.svg';
import { ReactComponent as GridListIcon } from '../../Assets/icons/iconGrid.svg';
import { ReactComponent as FilterIcon } from '../../Assets/icons/search-svgrepo-com.svg';
import { ReactComponent as MgfGlassIcon } from '../../Assets/icons/search-svgrepo-com.svg';

const ProductCatalog = () => {
	const { data, get } = useAxios();
	const search = useForm('search');

	const { '*': params } = useParams();
	const productRequest = new ProductRequest();

	console.log(params);

	React.useEffect(() => {
		const { url } = productRequest.SEARCH_PRODUCTS(params.replace(':', ''));
		get(url);
	}, []);

	console.log(data);

	return (
		<div className="productCatalogPage">
			<div className="pCatalogContainer">
				<div className="pCatalogHeader">
					<div className="pch-search">
						<CustomInput placeHolder={'Pesquisar ofertas...'} />
						<button>
							<MgfGlassIcon />
						</button>
					</div>
					<div className="pch-order">
						<OrderIcon />
						<p>Ordernar:</p>
						<select>
							<option selected>Escolha</option>
							<option>Preço Crescente</option>
							<option>Preço Decrescente</option>
						</select>
					</div>

					<div className="pch-view">
						<p>Exibir:</p>
						<select>
							<option selected>20 por página</option>
							<option>40 por página</option>
							<option>60 por página</option>
							<option>80 por página</option>
							<option>100 por página</option>
						</select>
					</div>

					<div>100 Produtos</div>

					<div className="pch-orderIcon">
						<IconList />
						<GridListIcon />
					</div>
				</div>
				<div className="pCatalogMain">
					<div className="pCatalogFilter">
						<div>
							<FilterIcon />
							<p>Filtrar por:</p>
						</div>

						<div>
							<div></div>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default ProductCatalog;
