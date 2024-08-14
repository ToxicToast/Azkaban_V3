import {
	useBrandState,
	useCategoryState,
	useLocationState,
	useSizeState,
	useTypeState,
	useWarehouseState,
	useProductState,
} from '../features/shared/store/foodfolio';
import { useEffect } from 'react';

interface Props {
	isAuthenticated: boolean;
}

export function Azkaban(props: Props) {
	const { isAuthenticated } = props;

	const { fetchCategoriesTrigger } = useCategoryState();
	const { fetchBrandsTrigger } = useBrandState();
	const { fetchLocationsTrigger } = useLocationState();
	const { fetchSizesTrigger } = useSizeState();
	const { fetchTypesTrigger } = useTypeState();
	const { fetchWarehousesTrigger } = useWarehouseState();
	const { fetchProductsTrigger } = useProductState();

	useEffect(() => {
		if (isAuthenticated) {
			fetchCategoriesTrigger();
			fetchBrandsTrigger();
			fetchLocationsTrigger();
			fetchSizesTrigger();
			fetchTypesTrigger();
			fetchWarehousesTrigger();
			fetchProductsTrigger();
		}
	}, [
		fetchProductsTrigger,
		fetchWarehousesTrigger,
		fetchTypesTrigger,
		fetchSizesTrigger,
		fetchLocationsTrigger,
		fetchBrandsTrigger,
		fetchCategoriesTrigger,
		isAuthenticated,
	]);

	return null;
}
