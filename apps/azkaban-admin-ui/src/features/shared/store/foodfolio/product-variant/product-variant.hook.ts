import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectProductVariantData,
	selectProductVariantDataCount,
	selectProductVariantDataLatest,
	selectSelectedProductVariant,
	selectSelectedProductVariantId,
} from './product-variant.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { productVariantSlice } from './product-variant.slice';
import {
	useCreateProductVariantMutation,
	useLazyFetchProductVariantsQuery,
} from './product-variant.api';

export function useProductVariantState() {
	const dispatch = useDispatch();
	// Selectors
	const productData = useAppSelector(selectProductVariantData);
	const productId = useAppSelector(selectSelectedProductVariantId);
	const product = useAppSelector(selectSelectedProductVariant);
	const productCount = useAppSelector(selectProductVariantDataCount);
	const productLatest = useAppSelector(selectProductVariantDataLatest);
	// Api Trigger
	const [fetchProductVariantsTrigger] = useLazyFetchProductVariantsQuery();
	// Api Mutations
	const [createProductVariantTrigger] = useCreateProductVariantMutation();
	// Actions
	const selectProductVariantId = useCallback(
		(id: Nullable<string>) => {
			dispatch(productVariantSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		productData,
		productId,
		product,
		productCount,
		productLatest,
		fetchProductVariantsTrigger,
		createProductVariantTrigger,
		selectProductVariantId,
	};
}
