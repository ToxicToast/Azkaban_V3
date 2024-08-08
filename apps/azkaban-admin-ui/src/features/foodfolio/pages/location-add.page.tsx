import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { foodfolioLocationRoute } from '../../../config/routes';
import { Headline } from '../../shared/components/components/headline.component';
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Show,
} from '../../shared';
import { TitleForm } from '../../shared/components/form/title.form';
import { SubmitForm } from '../../shared/components/form/submit.form';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { useLocationState } from '../../shared/store/foodfolio';
import { LocateIcon } from 'lucide-react';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';

type LocationForm = {
	title: string;
	parent_id: Nullable<string>;
	freezer: string;
};

function LocationAddPage() {
	const { locationData, createLocationTrigger } = useLocationState();
	const navigate = useNavigate();
	const { handleSubmit, setValue } = useForm<LocationForm>();

	const navigateBack = useCallback(() => {
		navigate(foodfolioLocationRoute);
	}, [navigate]);

	const onSubmit = useCallback(
		(data: LocationForm) => {
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
										<Select
											onValueChange={(value) =>
												setValue('parent_id', value)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="No Parent Location" />
											</SelectTrigger>
											<SelectContent>
												{locationData.map(
													(location) => (
														<SelectItem
															key={location.id}
															value={location.id}
														>
															<SelectItemAtom
																icon={
																	<LocateIcon className="size-5" />
																}
																title={
																	location.title
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

						<Card>
							<CardHeader>
								<CardTitle>Is Location a Freezer?</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6">
									<div className="grid gap-3">
										<Select
											onValueChange={(value) =>
												setValue('freezer', value)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="No Freezer" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="0">
													<SelectItemAtom
														icon={<></>}
														title="No"
													/>
												</SelectItem>
												<SelectItem value="1">
													<SelectItemAtom
														icon={<></>}
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
