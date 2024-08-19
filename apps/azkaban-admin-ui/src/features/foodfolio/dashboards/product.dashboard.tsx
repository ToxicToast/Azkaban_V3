import {
	useCategoryState,
	useLocationState,
	useBrandState,
	useSizeState,
	useTypeState,
	useWarehouseState,
	useProductState,
} from '../../shared/store/foodfolio';
import { Show, Table, TableBody } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioProductAddRoute,
	foodfolioProductViewRoute,
} from '../../../config/routes';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { ProductHeaders } from '../components/product-headers.component';
import { ProductList } from '../components/product-list.component';
import { ProductFooter } from '../components/product-footer.component';

function ProductDashboardPage() {
	const { productData, productCount, selectProductId } = useProductState();

	const navigate = useNavigate();

	const onView = useCallback(
		(productId: string) => {
			selectProductId(productId);
			navigate(foodfolioProductViewRoute);
		},
		[navigate, selectProductId],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioProductAddRoute);
	}, [navigate]);

	return (
		<>
			<PageTitle
				title="Products"
				description="All Foodfolio Products."
				type="Product"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table className="rounded border">
					<ProductHeaders />
					<TableBody>
						{productData.map((product) => (
							<ProductList
								key={product.id}
								product={product}
								onView={() => onView(product.id)}
							/>
						))}
					</TableBody>
					<Show show={productCount === 0}>
						<ProductFooter />
					</Show>
				</Table>
			</div>
		</>
	);
}

export default ProductDashboardPage;
