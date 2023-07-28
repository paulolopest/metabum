import React from 'react';
import useForm from '../../Hooks/useForm';
import useAxios from '../../Hooks/useAxios';
import { useParams } from 'react-router-dom';
import Loading from './../../Components/Loading/Loading';
import { ProductRequest } from '../../Requests/ProductRequest';
import ProductCard from './../../Components/ProductCard/ProductCard';
import CustomInput from './../../Components/Form/CustomInput/CustomInput';
import { ReactComponent as OrderIcon } from '../../Assets/icons/order.svg';
import { ReactComponent as IconList } from '../../Assets/icons/iconList.svg';
import { ReactComponent as FilterIcon } from '../../Assets/icons/filter.svg';
import { ReactComponent as GridListIcon } from '../../Assets/icons/iconGrid.svg';
import { ReactComponent as MgfGlassIcon } from '../../Assets/icons/search-svgrepo-com.svg';

const ProductCatalog = () => {
	const [activeBrand, setActiveBrand] = React.useState('');
	const [activeDepartment, setActiveDepartment] = React.useState('');
	const [orderBy, setOrderBy] = React.useState('asc');
	const [pageLimit, setPageLimit] = React.useState(20);

	const { data, get, loading } = useAxios();
	const search = useForm('search');

	const { '*': params } = useParams();
	const productRequest = new ProductRequest();

	React.useEffect(() => {
		const { url } = productRequest.SEARCH_PRODUCTS(
			params.replace(':', ''),
			activeBrand,
			activeDepartment,
			orderBy,
			pageLimit
		);
		get(url);
	}, [activeBrand, activeDepartment, orderBy, pageLimit]);

	const checkboxContainer = (filter, typeState, setTypeState) => {
		const getColumn = new Set(data?.map((product) => product[filter]));
		const filteredArray = [...getColumn].map((column) => (
			<div className="checkboxContainer" key={column}>
				<input
					onChange={() =>
						typeState === column ? setTypeState('') : setTypeState(column)
					}
					checked={typeState === column ? true : false}
					type="checkbox"
					value={column}
					name={column}
					id={column}
				></input>
				<label htmlFor={column}>{column}</label>
			</div>
		));

		return filteredArray;
	};

	const productMap = data?.map((product) => (
		<ProductCard key={product.id} product={product} />
	));

	console.log(pageLimit);

	if (loading) return <Loading />;
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
							<option defaultValue>Escolha</option>
							<option>Preço Crescente</option>
							<option>Preço Decrescente</option>
						</select>
					</div>

					<div className="pch-view">
						<p>Exibir:</p>
						<select
							value={`${pageLimit} por página`}
							onChange={({ target }) => setPageLimit(target.value)}
						>
							<option value={20}>Padrão (20)</option>
							<option defaultValue>{`${pageLimit} por página`}</option>

							<option value={Number(pageLimit) + 20}>
								{Number(pageLimit) + 20} por página
							</option>
							<option value={Number(pageLimit) + 40}>
								{Number(pageLimit) + 40} por página
							</option>
						</select>
					</div>

					<div>{data?.length} produtos</div>

					<div className="pch-orderIcon">
						<IconList />
						<GridListIcon />
					</div>
				</div>
				<div className="pCatalogMain">
					<div className="pCatalogFilter">
						<div className="pcf-header">
							<FilterIcon />
							<p>Filtrar por:</p>
						</div>

						<div className="pcFilter-main">
							<div className="pcf-filterCheckbox">
								<p>Marcas</p>
								{checkboxContainer(
									'brand',
									activeBrand,
									setActiveBrand
								)}
							</div>
							<div className="pcf-filterCheckbox">
								<p>Departamentos</p>
								{checkboxContainer(
									'department',
									activeDepartment,
									setActiveDepartment
								)}
							</div>
						</div>
					</div>

					<div className="pCatalog">{productMap}</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCatalog;
