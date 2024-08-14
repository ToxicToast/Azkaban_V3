import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { foodfolioLocationRoute } from '../../../config/routes';
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
import { TitleForm } from '../../shared/components/form/title.form';
import { SubmitForm } from '../../shared/components/form/submit.form';
import { useLocationState } from '../../shared/store/foodfolio';
import { RefrigeratorIcon, VaultIcon } from 'lucide-react';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { CreateFoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { LocationSelectWidget } from '../widgets/location-select.widget';

function LocationAddPage() {
	const { locationData, createLocationTrigger } = useLocationState();
	const navigate = useNavigate();
	const { handleSubmit, setValue } = useForm<CreateFoodFolioLocation>({
		values: {
			title: '',
			parent_id: null,
			freezer: false,
		},
	});

	const navigateBack = useCallback(() => {
		navigate(foodfolioLocationRoute);
	}, [navigate]);

	const onSubmit = useCallback(
		(data: CreateFoodFolioLocation) => {
			const { title } = data;
			if (title.trim() !== '') {
				createLocationTrigger(data);
				navigateBack();
			}
		},
		[createLocationTrigger, navigateBack],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
				<div className="flex items-center gap-4">
					<Headline
						headline="Add Location"
						badgeText="Draft"
						onNavigateBack={() => navigateBack()}
					/>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Location Details</CardTitle>
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
								<CardTitle>Parent Location</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<LocationSelectWidget
											locations={locationData}
											onChange={(id) =>
												setValue('parent_id', id)
											}
											selectValueText="No Parent Location"
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Is Location a Freezer?</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<Select
											onValueChange={(value) =>
												setValue(
													'freezer',
													value === '1',
												)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="No" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="0">
													<SelectItemAtom
														icon={
															<VaultIcon className="size-5" />
														}
														title="No"
													/>
												</SelectItem>
												<SelectItem value="1">
													<SelectItemAtom
														icon={
															<RefrigeratorIcon className="size-5" />
														}
														title="Yes"
													/>
												</SelectItem>
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

export default LocationAddPage;
