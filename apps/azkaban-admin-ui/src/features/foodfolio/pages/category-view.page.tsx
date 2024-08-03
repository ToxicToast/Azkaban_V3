import { useCategoryState } from '../../shared/store/foodfolio';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Debugger,
	Input,
	Label,
} from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { Headline } from '../../shared/components/components/headline.component';

function CategoryViewPage() {
	const { category, selectCategoryId, categoryDropdown } = useCategoryState();
	const navigate = useNavigate();

	const navigateBack = useCallback(() => {
		selectCategoryId(null);
		navigate('/foodfolio/category');
	}, [navigate, selectCategoryId]);

	const statusButtonVariant = useMemo(() => {
		return category?.isActive ? 'default' : 'destructive';
	}, [category?.isActive]);

	const statusButtonText = useMemo(() => {
		return category?.isActive ? 'Active' : 'Inactive';
	}, [category?.isActive]);

	return (
		<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Headline
					headline={`View Category #${category?.id}`}
					onNavigateBack={navigateBack}
				/>
				BADGE
				<div className="hidden items-center gap-2 md:ml-auto md:flex">
					<Button variant="outline" size="sm">
						Discard
					</Button>
					<Button size="sm">Save Category</Button>
				</div>
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
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										type="text"
										className="w-full"
										defaultValue={category?.title}
										readOnly={true}
										disabled={true}
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
									<Debugger data={categoryDropdown} />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Card>
						<CardHeader>
							<CardTitle>Category Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Button variant={statusButtonVariant}>
										{statusButtonText}
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Archive Category</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Button variant="secondary">
										Archive Category
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default CategoryViewPage;
