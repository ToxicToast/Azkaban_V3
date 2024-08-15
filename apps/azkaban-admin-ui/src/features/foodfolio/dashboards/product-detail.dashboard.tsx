import {
	useProductDetailState,
	useProductState,
} from '../../shared/store/foodfolio';
import { Debugger, Table, TableBody } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioProductDetailAddRoute,
	foodfolioProductDetailViewRoute,
} from '../../../config/routes';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { FoodFolioItem } from '@toxictoast/azkaban-sdk';
import { ProductDetailHeaders } from '../components/product-detail-headers.component';
import { ProductDetailList } from '../components/product-detail-list.component';

function ProductDetailDashboardPage() {
	const { productDetailData, selectProductDetailId } =
		useProductDetailState();
	const { productData } = useProductState();

	const navigate = useNavigate();

	const onView = useCallback(
		(detailId: string) => {
			selectProductDetailId(detailId);
			navigate(foodfolioProductDetailViewRoute);
		},
		[selectProductDetailId, navigate],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioProductDetailAddRoute);
	}, [navigate]);

	const findItem = useCallback(
		(productId: Nullable<string>) => {
			return productData.find(
				(product: FoodFolioItem) => product.id === productId,
			);
		},
		[productData],
	);

	return (
		<>
			<PageTitle
				title="Product Details"
				description="All Foodfolio Product Details."
				type="Product Detail"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table>
					<ProductDetailHeaders />
					<TableBody>
						{productDetailData.map((detail) => (
							<ProductDetailList
								detail={detail}
								item={findItem(detail.item_id) ?? null}
								key={detail.id}
								onView={() => onView(detail.id)}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export default ProductDetailDashboardPage;
