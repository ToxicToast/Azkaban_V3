import { Headline } from '../../shared/components/components/headline.component';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label,
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
			createCategoryTrigger(data);
			navigateBack();
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
										<Label htmlFor="title">Title</Label>
										<Input
											id="title"
											type="text"
											className="w-full"
											onChange={(e) =>
												setValue(
													'title',
													e.target.value,
												)
											}
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
															{category.title}
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
										<Button
											variant="default"
											className="w-full"
											type="submit"
										>
											Save
										</Button>
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
