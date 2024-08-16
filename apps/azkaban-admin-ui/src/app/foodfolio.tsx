import { useEffect } from 'react';
import {
	useBrandState,
	useCategoryState,
	useLocationState,
	useProductDetailState,
	useProductState,
	useSizeState,
	useTypeState,
	useWarehouseState,
	useProductVariantState,
} from '../features/shared/store/foodfolio';

interface Props {
	isAuthenticated: boolean;
	canSeeFoodfolio: boolean;
}

export function Foodfolio(props: Props) {
	const { isAuthenticated, canSeeFoodfolio } = props;

	const { fetchCategoriesTrigger } = useCategoryState();
	const { fetchBrandsTrigger } = useBrandState();
	const { fetchLocationsTrigger } = useLocationState();
	const { fetchSizesTrigger } = useSizeState();
	const { fetchTypesTrigger } = useTypeState();
	const { fetchWarehousesTrigger } = useWarehouseState();
	const { fetchProductsTrigger } = useProductState();
	const { fetchProductDetailsTrigger } = useProductDetailState();
	const { fetchProductVariantsTrigger } = useProductVariantState();

	useEffect(() => {
		if (isAuthenticated && canSeeFoodfolio) {
			fetchCategoriesTrigger();
			fetchBrandsTrigger();
			fetchLocationsTrigger();
			fetchSizesTrigger();
			fetchTypesTrigger();
			fetchWarehousesTrigger();
			fetchProductsTrigger();
			fetchProductDetailsTrigger();
			fetchProductVariantsTrigger();
		}
	}, [
		fetchProductVariantsTrigger,
		fetchProductDetailsTrigger,
		fetchProductsTrigger,
		fetchWarehousesTrigger,
		fetchTypesTrigger,
		fetchSizesTrigger,
		fetchLocationsTrigger,
		fetchBrandsTrigger,
		fetchCategoriesTrigger,
		canSeeFoodfolio,
		isAuthenticated,
	]);

	return null;
}
