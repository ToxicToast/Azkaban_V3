import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectProductData,
	selectProductDataCount,
	selectProductDataLatest,
	selectSelectedProduct,
	selectSelectedProductId,
} from './product.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { productSlice } from './product.slice';
import {
	useCreateProductMutation,
	useLazyFetchProductsQuery,
} from './product.api';

export function useProductState() {
	const dispatch = useDispatch();
	// Selectors
	const productData = useAppSelector(selectProductData);
	const productId = useAppSelector(selectSelectedProductId);
	const product = useAppSelector(selectSelectedProduct);
	const productCount = useAppSelector(selectProductDataCount);
	const productLatest = useAppSelector(selectProductDataLatest);
	// Api Trigger
	const [fetchProductsTrigger] = useLazyFetchProductsQuery();
	// Api Mutations
	const [createProductTrigger] = useCreateProductMutation();
	// Actions
	const selectProductId = useCallback(
		(id: Nullable<string>) => {
			dispatch(productSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		productData,
		productId,
		product,
		productCount,
		productLatest,
		fetchProductsTrigger,
		createProductTrigger,
		selectProductId,
	};
}
