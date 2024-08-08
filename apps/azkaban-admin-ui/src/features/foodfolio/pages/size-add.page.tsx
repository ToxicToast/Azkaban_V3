import { useSizeState } from '../../shared/store/foodfolio';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { foodfolioSizeRoute } from '../../../config/routes';
import { Headline } from '../../shared/components/components/headline.component';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared';
import { TitleForm } from '../../shared/components/form/title.form';
import { SubmitForm } from '../../shared/components/form/submit.form';

type SizeForm = {
	title: string;
};

function SizeAddPage() {
	const { createSizeTrigger } = useSizeState();
	const navigate = useNavigate();
	const { handleSubmit, setValue } = useForm<SizeForm>();

	const navigateBack = useCallback(() => {
		navigate(foodfolioSizeRoute);
	}, [navigate]);

	const onSubmit = useCallback(
		(data: SizeForm) => {
			const { title } = data;
			if (title.trim() !== '') {
				createSizeTrigger(data);
				navigateBack();
			}
		},
		[createSizeTrigger, navigateBack],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
				<div className="flex items-center gap-4">
					<Headline
						headline="Add Size"
						badgeText="Draft"
						onNavigateBack={() => navigateBack()}
					/>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Size Details</CardTitle>
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

export default SizeAddPage;
