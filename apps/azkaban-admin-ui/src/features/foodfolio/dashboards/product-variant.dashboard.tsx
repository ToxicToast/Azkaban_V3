import { Show, Table, TableBody } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioProductVariantAddRoute,
	foodfolioProductVariantViewRoute,
} from '../../../config/routes';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { ProductVariantHeaders } from '../components/product-variant-headers.component';
import { ProductVariantFooter } from '../components/product-variant-footer.component';
import { Nullable } from '@toxictoast/azkaban-base-types';
import {
	FoodFolioCategory,
	FoodFolioCompany,
	FoodFolioItem,
	FoodFolioLocation,
	FoodFolioSize,
	FoodFolioType,
	FoodFolioWarehouse,
} from '@toxictoast/azkaban-sdk';
import {
	useBrandState,
	useCategoryState,
	useLocationState,
	useProductState,
	useProductVariantState,
	useSizeState,
	useTypeState,
	useWarehouseState,
} from '../../shared/store/foodfolio';
import { ProductVariantList } from '../components/product-variant-list.component';

function ProductVariantDashboardPage() {
	const navigate = useNavigate();
	const { categoryData } = useCategoryState();
	const { locationData } = useLocationState();
	const { brandData } = useBrandState();
	const { sizeData } = useSizeState();
	const { typeData } = useTypeState();
	const { warehouseData } = useWarehouseState();
	const { productData } = useProductState();
	const { productVariantData, productVariantCount } =
		useProductVariantState();

	const onView = useCallback(
		(detailId: string) => {
			navigate(foodfolioProductVariantViewRoute);
		},
		[navigate],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioProductVariantAddRoute);
	}, [navigate]);

	const findProduct = useCallback(
		(productId: Nullable<string>) => {
			return productData.find(
				(product: FoodFolioItem) => product.id === productId,
			);
		},
		[productData],
	);

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
				title="Product Variants"
				description="All Foodfolio Product Variants."
				type="Product Variant"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table className="rounded border">
					<ProductVariantHeaders />
					<TableBody>
						{productVariantData.map((variant) => (
							<ProductVariantList
								key={variant.id}
								variant={variant}
								onView={() => onView(variant.id)}
								product={findProduct(variant.item_id) ?? null}
								category={
									findCategory(variant.category_id) ?? null
								}
								location={
									findLocation(variant.location_id) ?? null
								}
								brand={findBrand(variant.company_id) ?? null}
								size={findSize(variant.size_id) ?? null}
								type={findType(variant.type_id) ?? null}
								warehouse={
									findWarehouse(variant.warehouse_id) ?? null
								}
							/>
						))}
					</TableBody>
					<Show show={productVariantCount === 0}>
						<ProductVariantFooter />
					</Show>
				</Table>
			</div>
		</>
	);
}

export default ProductVariantDashboardPage;
