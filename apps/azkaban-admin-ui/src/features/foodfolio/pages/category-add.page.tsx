import { Headline } from '../../shared/components/components/headline.component';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Debugger,
	Input,
	Label,
} from '../../shared';
import { useCategoryState } from '../../shared/store/foodfolio';

function CategoryAddPage() {
	const { categoryData } = useCategoryState();

	return (
		<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Headline
					headline="Add Category"
					badgeText="Draft"
					onNavigateBack={console.log}
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
									<Input id="title" />
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
									<Debugger data={categoryData} />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default CategoryAddPage;
