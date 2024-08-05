import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Label,
} from '../../shared';
import { useUserState } from '../../shared/store/user/user.hook';
import { Headline } from '../../shared/components/components/headline.component';
import { Status } from '../../shared/components/components/status.component';
import { Banned } from '../../shared/components/components/banned.component';
import { Archive } from '../../shared/components/components/archive.component';
import { GroupsList } from '../components/groups-list.component';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersRoute } from '../../../config/routes';

function UserViewPage() {
	const { selectedUser, selectUserId } = useUserState();
	const navigate = useNavigate();

	const navigateBack = useCallback(() => {
		selectUserId(null);
		navigate(usersRoute);
	}, [navigate, selectUserId]);

	useEffect(() => {
		if (!selectedUser) {
			navigateBack();
		}
	}, [navigateBack, selectedUser]);

	return (
		<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Headline
					headline="View User"
					badgeText={selectedUser?.id ?? '-'}
					onNavigateBack={navigateBack}
				/>
			</div>
			<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
				<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<Card>
						<CardHeader>
							<CardTitle>User Details</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="username">Username</Label>
									<Badge id="username">
										{selectedUser?.username}
									</Badge>
								</div>

								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Badge id="email">
										{selectedUser?.email}
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>User Token</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="activation_token">
										Activation Token
									</Label>
									<Badge>
										{selectedUser?.activation_token ?? '-'}
									</Badge>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>User Groups</CardTitle>
						</CardHeader>
						<CardContent>
							<GroupsList groups={selectedUser?.groups ?? []} />
						</CardContent>
					</Card>
				</div>

				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Status
						isActive={selectedUser?.isActive ?? false}
						type="User"
					/>

					<Card>
						<CardHeader>
							<CardTitle>User Banned</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Banned
										isBanned={
											selectedUser?.isBanned ?? false
										}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Archive
						isDeleted={selectedUser?.isDeleted ?? false}
						type="User"
					/>
				</div>
			</div>
		</div>
	);
}

export default UserViewPage;
