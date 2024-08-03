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
import { useUserState } from '../../shared/store/user/user.hook';
import { Headline } from '../../shared/components/components/headline.component';
import { Status } from '../../shared/components/components/status.component';
import { Banned } from '../../shared/components/components/banned.component';
import { Archive } from '../../shared/components/components/archive.component';
import { GroupsList } from '../components/groups-list.component';

function UserViewPage() {
	const { selectedUser } = useUserState();

	return (
		<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Headline headline={`View User #${selectedUser?.id}`} />
				BADGE
				<div className="hidden items-center gap-2 md:ml-auto md:flex">
					<Button variant="outline" size="sm">
						Discard
					</Button>
					<Button size="sm">Save User</Button>
				</div>
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
									<Input
										id="username"
										type="text"
										className="w-full"
										defaultValue={selectedUser?.username}
										readOnly={true}
										disabled={true}
									/>
								</div>

								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="text"
										className="w-full"
										defaultValue={selectedUser?.email}
										readOnly={true}
										disabled={true}
									/>
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
					<Card>
						<CardHeader>
							<CardTitle>User Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Status
										isActive={
											selectedUser?.isActive ?? false
										}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

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

					<Debugger data={selectedUser} />
				</div>
			</div>
		</div>
	);
}

export default UserViewPage;
