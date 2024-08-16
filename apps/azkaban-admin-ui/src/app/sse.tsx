import { useCallback, useEffect, useRef } from 'react';
import { sseEndpoint } from '../config/endpoints';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { FoodfolioEvents } from '../features/shared';
import {
	useBrandState,
	useCategoryState,
	useLocationState,
	useProductDetailState,
	useProductState,
	useSizeState,
	useTypeState,
	useWarehouseState,
} from '../features/shared/store/foodfolio';

interface Props {
	isAuthenticated: boolean;
	canSeeAzkaban: boolean;
	canSeeFoodfolio: boolean;
}

export function SSE(props: Props) {
	const { isAuthenticated, canSeeFoodfolio, canSeeAzkaban } = props;
	const eventSource = useRef<Nullable<EventSource>>(null);
	const { fetchCategoriesTrigger } = useCategoryState();
	const { fetchBrandsTrigger } = useBrandState();
	const { fetchLocationsTrigger } = useLocationState();
	const { fetchSizesTrigger } = useSizeState();
	const { fetchTypesTrigger } = useTypeState();
	const { fetchWarehousesTrigger } = useWarehouseState();
	const { fetchProductsTrigger } = useProductState();
	const { fetchProductDetailsTrigger } = useProductDetailState();

	const processFoodfolioEvents = useCallback(
		(event: string, data: unknown) => {
			if (event === FoodfolioEvents.CATEGORY_CREATE) {
				console.log(FoodfolioEvents.CATEGORY_CREATE, data);
				fetchCategoriesTrigger();
			} else if (event === FoodfolioEvents.BRAND_CREATE) {
				console.log(FoodfolioEvents.BRAND_CREATE, data);
				fetchBrandsTrigger();
			} else if (event === FoodfolioEvents.LOCATION_CREATE) {
				console.log(FoodfolioEvents.LOCATION_CREATE, data);
				fetchLocationsTrigger();
			} else if (event === FoodfolioEvents.SIZE_CREATE) {
				console.log(FoodfolioEvents.SIZE_CREATE, data);
				fetchSizesTrigger();
			} else if (event === FoodfolioEvents.TYPE_CREATE) {
				console.log(FoodfolioEvents.TYPE_CREATE, data);
				fetchTypesTrigger();
			} else if (event === FoodfolioEvents.WAREHOUSE_CREATE) {
				console.log(FoodfolioEvents.WAREHOUSE_CREATE, data);
				fetchWarehousesTrigger();
			} else if (event === FoodfolioEvents.PRODUCT_CREATE) {
				console.log(FoodfolioEvents.PRODUCT_CREATE, data);
				fetchProductsTrigger();
				fetchProductDetailsTrigger();
			} else if (event === FoodfolioEvents.PRODUCT_DETAIL_CREATE) {
				console.log(FoodfolioEvents.PRODUCT_DETAIL_CREATE, data);
				fetchProductDetailsTrigger();
			} else {
				console.log('Foodfolio', event, data);
			}
		},
		[
			fetchBrandsTrigger,
			fetchCategoriesTrigger,
			fetchLocationsTrigger,
			fetchProductDetailsTrigger,
			fetchProductsTrigger,
			fetchSizesTrigger,
			fetchTypesTrigger,
			fetchWarehousesTrigger,
		],
	);

	const processAzkabanEvents = useCallback((event: string, data: unknown) => {
		console.log('Azkaban', event, data);
	}, []);

	const onMessageEvent = useCallback(
		(event: MessageEvent) => {
			const eventType = event.type;
			const eventData = event.data;
			if (canSeeFoodfolio) {
				processFoodfolioEvents(eventType, eventData);
			}
			if (canSeeAzkaban) {
				processAzkabanEvents(eventType, eventData);
			}
		},
		[
			canSeeAzkaban,
			canSeeFoodfolio,
			processAzkabanEvents,
			processFoodfolioEvents,
		],
	);

	useEffect(() => {
		if (isAuthenticated) {
			eventSource.current = new EventSource(sseEndpoint);
		}
		return () => {
			if (eventSource.current !== null) {
				eventSource.current.close();
				eventSource.current = null;
			}
		};
	}, [isAuthenticated, onMessageEvent]);

	useEffect(() => {
		if (eventSource.current !== null) {
			eventSource.current.onmessage = (event) => {
				console.error(event);
				onMessageEvent(event);
			};
		}
	}, [onMessageEvent]);

	return null;
}
