import {
	useProductDetailState,
	useProductVariantState,
} from '../../shared/store/foodfolio';
import { Show, Table, TableBody } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioProductDetailAddRoute,
	foodfolioProductDetailViewRoute,
} from '../../../config/routes';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { FoodFolioItemVariant } from '@toxictoast/azkaban-sdk';
import { ProductDetailHeaders } from '../components/product-detail-headers.component';
import { ProductDetailList } from '../components/product-detail-list.component';
import { ProductDetailFooter } from '../components/product-detail-footer.component';

function ProductDetailDashboardPage() {
	const { productDetailData, productDetailCount, selectProductDetailId } =
		useProductDetailState();
	const { productVariantData } = useProductVariantState();

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

	const findItemVariant = useCallback(
		(productId: Nullable<string>) => {
			return productVariantData.find(
				(product: FoodFolioItemVariant) => product.id === productId,
			);
		},
		[productVariantData],
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
				<Table className="rounded border">
					<ProductDetailHeaders />
					<TableBody>
						{productDetailData.map((detail) => (
							<ProductDetailList
								detail={detail}
								item={findItemVariant(detail.item_id) ?? null}
								key={detail.id}
								onView={() => onView(detail.id)}
							/>
						))}
					</TableBody>
					<Show show={productDetailCount === 0}>
						<ProductDetailFooter />
					</Show>
				</Table>
			</div>
		</>
	);
}

export default ProductDetailDashboardPage;
