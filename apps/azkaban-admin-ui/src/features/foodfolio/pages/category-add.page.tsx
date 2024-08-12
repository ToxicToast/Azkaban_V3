import { Headline } from '../../shared/components/components/headline.component';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { useCategoryState } from '../../shared/store/foodfolio';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { foodfolioCategoryRoute } from '../../../config/routes';
import { useForm } from 'react-hook-form';
import { TitleForm } from '../../shared/components/form/title.form';
import { SubmitForm } from '../../shared/components/form/submit.form';
import { BoxIcon } from 'lucide-react';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';

type CategoryForm = {
	title: string;
	parent_id: string;
};

function CategoryAddPage() {
	const { categoryData, createCategoryTrigger } = useCategoryState();
	const navigate = useNavigate();
	const { handleSubmit, setValue } = useForm<CategoryForm>();

	const navigateBack = useCallback(() => {
		navigate(foodfolioCategoryRoute);
	}, [navigate]);

	const onSubmit = useCallback(
		(data: CategoryForm) => {
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
										<Select
											onValueChange={(value) =>
												setValue('parent_id', value)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="No Parent Category" />
											</SelectTrigger>
											<SelectContent>
												{categoryData.map(
													(category) => (
														<SelectItem
															key={category.id}
															value={category.id}
														>
															<SelectItemAtom
																icon={
																	<BoxIcon className="size-5" />
																}
																title={
																	category.title
																}
															/>
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
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
