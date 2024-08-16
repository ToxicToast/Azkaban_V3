import {
	useCategoryState,
	useLocationState,
	useBrandState,
	useSizeState,
	useTypeState,
	useWarehouseState,
	useProductState,
} from '../../shared/store/foodfolio';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CreateFoodFolioItem } from '@toxictoast/azkaban-sdk';
import { useCallback } from 'react';
import { foodfolioProductRoute } from '../../../config/routes';
import { Headline } from '../../shared/components/components/headline.component';
import { Card, CardContent, CardHeader, CardTitle, Label } from '../../shared';
import { TitleForm } from '../../shared/components/form/title.form';
import { SubmitForm } from '../../shared/components/form/submit.form';
import { NumberForm } from '../../shared/components/form/number.form';
import { InputForm } from '../../shared/components/form/input.form';
import { CategorySelectWidget } from '../widgets/category-select.widget';
import { LocationSelectWidget } from '../widgets/location-select.widget';
import { BrandSelectWidget } from '../widgets/brand-select.widget';
import { SizeSelectWidget } from '../widgets/size-select.widget';
import { TypeSelectWidget } from '../widgets/type-select.widget';
import { WarehouseSelectWidget } from '../widgets/warehouse-select.widget';

function ProductAddPage() {
	const { categoryData } = useCategoryState();
	const { locationData } = useLocationState();
	const { brandData } = useBrandState();
	const { sizeData } = useSizeState();
	const { typeData } = useTypeState();
	const { warehouseData } = useWarehouseState();
	const { createProductTrigger } = useProductState();

	const navigate = useNavigate();
	const { handleSubmit, setValue } = useForm<CreateFoodFolioItem>({
		values: {
			title: '',
			current_sku: 0,
			min_sku: 0,
			max_sku: 0,
			ean: null,
			price: null,
			category_id: null,
			location_id: null,
			company_id: null,
			size_id: null,
			warehouse_id: null,
			type_id: null,
		},
	});

	const navigateBack = useCallback(() => {
		navigate(foodfolioProductRoute);
	}, [navigate]);

	const onSubmit = useCallback(
		(data: CreateFoodFolioItem) => {
			const { title, current_sku, min_sku, max_sku } = data;
			if (
				title.trim() !== '' &&
				current_sku !== null &&
				min_sku !== null &&
				max_sku !== null
			) {
				createProductTrigger(data);
				navigateBack();
			}
		},
		[createProductTrigger, navigateBack],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
				<div className="flex items-center gap-4">
					<Headline
						headline="Add Product"
						badgeText="Draft"
						onNavigateBack={() => navigateBack()}
					/>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Product Details</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<TitleForm
											onChange={(value) =>
												setValue('title', value)
											}
											onlyShow={false}
											isRequired={true}
										/>
									</div>
									<div className="grid gap-3">
										<NumberForm
											id="current_sku"
											title="Current Stock"
											onChange={(value) =>
												setValue(
													'current_sku',
													Number(value),
												)
											}
											onlyShow={false}
											isRequired={true}
											defaultValue="0"
										/>
										<NumberForm
											id="min_sku"
											title="Min Stock"
											onChange={(value) =>
												setValue(
													'min_sku',
													Number(value),
												)
											}
											onlyShow={false}
											isRequired={true}
											defaultValue="0"
										/>
										<NumberForm
											id="max_sku"
											title="Max Stock"
											onChange={(value) =>
												setValue(
													'max_sku',
													Number(value),
												)
											}
											onlyShow={false}
											isRequired={true}
											defaultValue="0"
										/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="ean">EAN</Label>
										<InputForm
											id="ean"
											type="text"
											onChange={(value) =>
												setValue('ean', value)
											}
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Category</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<CategorySelectWidget
											categories={categoryData}
											onChange={(id) =>
												setValue('category_id', id)
											}
											selectValueText="No Category"
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Location</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<LocationSelectWidget
											locations={locationData}
											onChange={(id) =>
												setValue('location_id', id)
											}
											selectValueText="No Location"
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Brand</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<BrandSelectWidget
											brands={brandData}
											onChange={(id) =>
												setValue('company_id', id)
											}
											selectValueText="No Brand"
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Size</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<SizeSelectWidget
											sizes={sizeData}
											onChange={(id) =>
												setValue('size_id', id)
											}
											selectValueText="No Size"
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Type</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<TypeSelectWidget
											types={typeData}
											onChange={(id) =>
												setValue('type_id', id)
											}
											selectValueText="No Type"
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Warehouse</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<WarehouseSelectWidget
											warehouses={warehouseData}
											onChange={(id) =>
												setValue('warehouse_id', id)
											}
											selectValueText="No Warehouse"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Actions</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<SubmitForm />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</form>
	);
}

export default ProductAddPage;
