import {
	useCategoryState,
	useLocationState,
	useBrandState,
	useSizeState,
	useTypeState,
	useWarehouseState,
	useProductState,
} from '../../shared/store/foodfolio';
import { Table, TableBody } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioProductAddRoute,
	foodfolioProductViewRoute,
} from '../../../config/routes';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { Nullable } from '@toxictoast/azkaban-base-types';
import {
	FoodFolioCategory,
	FoodFolioCompany,
	FoodFolioLocation,
	FoodFolioSize,
	FoodFolioType,
	FoodFolioWarehouse,
} from '@toxictoast/azkaban-sdk';
import { ProductHeaders } from '../components/product-headers.component';
import { ProductList } from '../components/product-list.component';

function ProductDashboardPage() {
	const { categoryData } = useCategoryState();
	const { locationData } = useLocationState();
	const { brandData } = useBrandState();
	const { sizeData } = useSizeState();
	const { typeData } = useTypeState();
	const { warehouseData } = useWarehouseState();
	const { productData } = useProductState();

	const navigate = useNavigate();

	const onView = useCallback(
		(userId: string) => {
			navigate(foodfolioProductViewRoute.replace(':id', userId));
		},
		[navigate],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioProductAddRoute);
	}, [navigate]);

	const findCategory = useCallback(
		(categoryId: Nullable<string>) => {
			return categoryData.find(
				(category: FoodFolioCategory) => category.id === categoryId,
			);
		},
		[categoryData],
	);

	const findLocation = useCallback(
		(locationId: Nullable<string>) => {
			return locationData.find(
				(location: FoodFolioLocation) => location.id === locationId,
			);
		},
		[locationData],
	);

	const findBrand = useCallback(
		(brandId: Nullable<string>) => {
			return brandData.find(
				(brand: FoodFolioCompany) => brand.id === brandId,
			);
		},
		[brandData],
	);

	const findSize = useCallback(
		(sizeId: Nullable<string>) => {
			return sizeData.find((size: FoodFolioSize) => size.id === sizeId);
		},
		[sizeData],
	);

	const findType = useCallback(
		(typeId: Nullable<string>) => {
			return typeData.find((type: FoodFolioType) => type.id === typeId);
		},
		[typeData],
	);

	const findWarehouse = useCallback(
		(warehouseId: Nullable<string>) => {
			return warehouseData.find(
				(warehouse: FoodFolioWarehouse) => warehouse.id === warehouseId,
			);
		},
		[warehouseData],
	);

	return (
		<>
			<PageTitle
				title="Products"
				description="All Foodfolio Products."
				type="Product"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table>
					<ProductHeaders />
					<TableBody>
						{productData.map((product) => (
							<ProductList
								key={product.id}
								product={product}
								onView={() => onView(product.id)}
								category={
									findCategory(product.category_id) ?? null
								}
								location={
									findLocation(product.location_id) ?? null
								}
								brand={findBrand(product.company_id) ?? null}
								size={findSize(product.size_id) ?? null}
								type={findType(product.type_id) ?? null}
								warehouse={
									findWarehouse(product.warehouse_id) ?? null
								}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export default ProductDashboardPage;
