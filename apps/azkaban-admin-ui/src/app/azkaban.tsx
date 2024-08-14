import {
	useBrandState,
	useCategoryState,
	useLocationState,
	useSizeState,
	useTypeState,
} from '../features/shared/store/foodfolio';
import { useEffect } from 'react';
import { useWarehouseState } from '../features/shared/store/foodfolio/warehouse';

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

	useEffect(() => {
		if (isAuthenticated) {
			fetchCategoriesTrigger();
			fetchBrandsTrigger();
			fetchLocationsTrigger();
			fetchSizesTrigger();
			fetchTypesTrigger();
			fetchWarehousesTrigger();
		}
	}, [
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
