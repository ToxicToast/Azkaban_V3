import { Headline } from '../../shared/components/components/headline.component';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared';
import { useCategoryState } from '../../shared/store/foodfolio';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { foodfolioCategoryRoute } from '../../../config/routes';
import { useForm } from 'react-hook-form';
import { TitleForm } from '../../shared/components/form/title.form';
import { SubmitForm } from '../../shared/components/form/submit.form';
import { CreateFoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { CategorySelectWidget } from '../widgets/category-select.widget';

function CategoryAddPage() {
	const { categoryData, createCategoryTrigger } = useCategoryState();
	const navigate = useNavigate();
	const { handleSubmit, setValue } = useForm<CreateFoodFolioCategory>({
		values: {
			title: '',
			parent_id: null,
		},
	});

	const navigateBack = useCallback(() => {
		navigate(foodfolioCategoryRoute);
	}, [navigate]);

	const onSubmit = useCallback(
		(data: CreateFoodFolioCategory) => {
			const { title } = data;
			if (title.trim() !== '') {
				createCategoryTrigger(data);
				navigateBack();
			}
		},
		[createCategoryTrigger, navigateBack],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
				<div className="flex items-center gap-4">
					<Headline
						headline="Add Category"
						badgeText="Draft"
						onNavigateBack={() => navigateBack()}
					/>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Category Details</CardTitle>
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
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Parent Category</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<CategorySelectWidget
											categories={categoryData}
											onChange={(id) =>
												setValue('parent_id', id)
											}
											selectValueText="No Parent Category"
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

export default CategoryAddPage;
