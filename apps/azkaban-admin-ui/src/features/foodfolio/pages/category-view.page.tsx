import { useCategoryState } from '../../shared/store/foodfolio';
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Debugger,
	Label,
} from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { Headline } from '../../shared/components/components/headline.component';
import { Status } from '../../shared/components/components/status.component';
import { Archive } from '../../shared/components/components/archive.component';
import { Restore } from '../../shared/components/components/restore.component';
import { foodfolioCategoryRoute } from '../../../config/routes';

function CategoryViewPage() {
	const { category, selectCategoryId, categoryData } = useCategoryState();
	const navigate = useNavigate();

	const navigateBack = useCallback(() => {
		selectCategoryId(null);
		navigate(foodfolioCategoryRoute);
	}, [navigate, selectCategoryId]);

	const parentCategory = useMemo(() => {
		return (
			categoryData.find((item) => item.id === category?.parent_id) ?? null
		);
	}, [category?.parent_id, categoryData]);

	useEffect(() => {
		if (!category) {
			navigateBack();
		}
	}, [category, navigateBack]);

	return (
		<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Headline
					headline="View Category"
					badgeText={category?.id ?? '-'}
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
									<Badge id="title" variant="secondary">
										{category?.title}
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card hidden={category?.isParent ?? false}>
						<CardHeader>
							<CardTitle>Parent Category</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Badge id="title" variant="secondary">
										{parentCategory?.title}
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Status
						isActive={category?.isActive ?? false}
						type="Category"
					/>

					<Archive
						isDeleted={category?.isDeleted ?? false}
						type="Category"
					/>

					<Restore
						isDeleted={category?.isDeleted ?? false}
						type="Category"
					/>
				</div>
			</div>
		</div>
	);
}

export default CategoryViewPage;
