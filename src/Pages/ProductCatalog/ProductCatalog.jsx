import React from 'react';
import useForm from '../../Hooks/useForm';
import useAxios from '../../Hooks/useAxios';
import useMedia from '../../Hooks/useMedia';
import Loading from '../../Components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductRequest } from '../../Requests/ProductRequest';
import ProductCard from '../../Components/ProductCard/ProductCard';
import CustomInput from '../../Components/Form/CustomInput/CustomInput';
import { ReactComponent as OrderIcon } from '../../Assets/icons/order.svg';
import { ReactComponent as IconList } from '../../Assets/icons/iconList.svg';
import { ReactComponent as FilterIcon } from '../../Assets/icons/filter.svg';
import { ReactComponent as GridListIcon } from '../../Assets/icons/iconGrid.svg';
import { ReactComponent as CloseIcon } from '../../Assets/icons/close-svgrepo-com.svg';
import { ReactComponent as MgfGlassIcon } from '../../Assets/icons/search-svgrepo-com.svg';

const ProductCatalog = () => {
	const [orderBy, setOrderBy] = React.useState('asc');
	const [pageLimit, setPageLimit] = React.useState(20);
	const [activeBrand, setActiveBrand] = React.useState('');
	const [loadingMore, setLoadingMore] = React.useState(true);
	const [filterSideBar, setFilterSideBar] = React.useState(false);
	const [activeDepartment, setActiveDepartment] = React.useState('');

	const productRequest = new ProductRequest();

	const { data, get } = useAxios();

	const search = useForm('search');
	const { '*': params } = useParams();
	const mobileScreen = useMedia('(max-width: 900px)');
	const navigate = useNavigate();

	React.useEffect(() => {
		const { url } = productRequest.SEARCH_PRODUCTS(
			params.replace(':', ''),
			search.value,
			activeBrand,
			activeDepartment,
			orderBy,
			'price',
			pageLimit
		);
		get(url);
	}, [activeBrand, activeDepartment, orderBy, pageLimit]);

	React.useEffect(() => {
		if (filterSideBar) {
			document.body.classList.add('loading');
		} else {
			document.body.classList.remove('loading');
		}
	}, [filterSideBar]);

	React.useEffect(() => {
		setTimeout(() => {
			setLoadingMore(false);
		}, 1000);
	}, []);

	const onClickOutside = (event) => {
		if (event.target === event.currentTarget) {
			setFilterSideBar(false);
		}
	};

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

	const handleSeeMore = () => {
		setTimeout(() => {
			setPageLimit(Number(pageLimit) + 20);
			setLoadingMore(false);
		}, 1000);
	};

	const handleSubmit = (event) => {
		const time = setTimeout(() => {
			const { url } = productRequest.SEARCH_PRODUCTS(
				params.replace(':', ''),
				search.value,
				activeBrand,
				activeDepartment,
				orderBy,
				'price',
				pageLimit
			);
			get(url);
		}, 500);

		event.preventDefault();

		return () => clearTimeout(time);
	};

	const productMap = data?.map((product) => (
		<ProductCard key={product.id} product={product} />
	));

	if (loadingMore) return <Loading />;
	if (data)
		return (
			<div className="productCatalogPage">
				<div className="pCatalogContainer">
					{!mobileScreen ? (
						<div className="pCatalogHeader">
							<form onSubmit={handleSubmit} className="pch-search">
								<CustomInput
									placeHolder={'Pesquisar ofertas...'}
									{...search}
								/>
								<button type="submit">
									<MgfGlassIcon />
								</button>
							</form>

							<div className="pch-order">
								<OrderIcon />
								<p>Ordernar:</p>
								<select
									onChange={({ target }) => setOrderBy(target.value)}
								>
									<option value={'asc'} defaultValue>
										Escolha
									</option>
									<option value={'asc'}>Preço Crescente</option>
									<option value={'desc'}>Preço Decrescente</option>
								</select>
							</div>

							<div className="pch-view">
								<p>Exibir:</p>
								<select
									value={`${pageLimit} por página`}
									onChange={({ target }) => setPageLimit(target.value)}
								>
									<option value={20}>Padrão (20)</option>
									<option
										defaultValue
									>{`${pageLimit} por página`}</option>

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
					) : (
						<div className="pCatalogHeaderMobile">
							<div className="pchm-firstContainer">
								<p>
									{data?.length} <strong>produtos</strong>
								</p>

								<div>
									<IconList />
									<GridListIcon />
								</div>
							</div>

							<div className="pchm-secondContainer">
								<button
									onClick={() => setFilterSideBar(!filterSideBar)}
								>
									<FilterIcon />
									Filtrar por
								</button>

								<select>
									<option>Preço Crescente</option>
									<option>Preço Decrescente</option>
								</select>

								<form onSubmit={handleSubmit}>
									<CustomInput
										placeHolder={'Pesquisar ofertas...'}
										{...search}
									/>

									<button>
										<MgfGlassIcon />
									</button>
								</form>
							</div>
						</div>
					)}
					<div className="pCatalogMain">
						{mobileScreen ? (
							<>
								{filterSideBar ? (
									<div
										onClick={onClickOutside}
										className="filterSBContainer"
									>
										<div className="filterSideBar animeLeft">
											<div className="pcf-header">
												<div>
													<FilterIcon />
													<p>Filtrar por:</p>
												</div>

												<CloseIcon
													onClick={() =>
														setFilterSideBar(!filterSideBar)
													}
												/>
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
									</div>
								) : (
									<></>
								)}
							</>
						) : (
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
						)}

						{data.length !== 0 ? (
							<div className="pCatalog">{productMap}</div>
						) : (
							<div className="catalogEmpty">
								<div>
									<p>Busca não encontrada</p>
									<button onClick={() => navigate('/')}>
										Continuar comprando
									</button>
								</div>
							</div>
						)}
					</div>

					{data.length !== 0 && (
						<button className="catalog-seeMore" onClick={handleSeeMore}>
							{loadingMore ? 'Carregando' : 'Ver mais'}
						</button>
					)}
				</div>
			</div>
		);
};

export default ProductCatalog;
