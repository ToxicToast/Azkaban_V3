import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
	selectProductDetailData,
	selectProductDetailDataCount,
	selectProductDetailDataLatest,
	selectSelectedProductDetail,
	selectSelectedProductDetailId,
} from './product-detail.selectors';
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { productDetailSlice } from './product-detail.slice';
import {
	useCreateProductDetailMutation,
	useLazyFetchProductDetailsQuery,
} from './product-detail.api';

export function useProductDetailState() {
	const dispatch = useDispatch();
	// Selectors
	const productDetailData = useAppSelector(selectProductDetailData);
	const productDetailId = useAppSelector(selectSelectedProductDetailId);
	const productDetail = useAppSelector(selectSelectedProductDetail);
	const productDetailCount = useAppSelector(selectProductDetailDataCount);
	const productDetailLatest = useAppSelector(selectProductDetailDataLatest);
	// Api Trigger
	const [fetchProductDetailsTrigger] = useLazyFetchProductDetailsQuery();
	// Api Mutations
	const [createProductDetailTrigger] = useCreateProductDetailMutation();
	// Actions
	const selectProductDetailId = useCallback(
		(id: Nullable<string>) => {
			dispatch(productDetailSlice.actions.setSelectedId(id));
		},
		[dispatch],
	);

	return {
		productDetailData,
		productDetailId,
		productDetail,
		productDetailCount,
		productDetailLatest,
		fetchProductDetailsTrigger,
		createProductDetailTrigger,
		selectProductDetailId,
	};
}
