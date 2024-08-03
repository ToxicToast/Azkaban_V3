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
import { ChevronLeft } from 'lucide-react';
import { useUserState } from '../../shared/store/user/user.hook';

function UserViewPage() {
	const { selectedUser } = useUserState();

	return (
		<div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
			<div className="flex items-center gap-4">
				<Button variant="outline" size="icon" className="h-7 w-7">
					<ChevronLeft className="h-4 w-4" />
					<span className="sr-only">Back</span>
				</Button>
				<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
					View User #{selectedUser?.id}
				</h1>
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
				</div>

				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<Card>
						<CardHeader>
							<CardTitle>User Status</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="status">Status</Label>
									<Debugger data={selectedUser?.isActive} />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Archive User</CardTitle>
						</CardHeader>
						<CardContent>
							<Debugger data={selectedUser} />
							<div></div>
							<Button size="sm" variant="secondary">
								Archive User
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default UserViewPage;
