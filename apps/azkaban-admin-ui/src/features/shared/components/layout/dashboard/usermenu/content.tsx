import { UserMenuContentUser } from './content/user';
import { UserMenuContentLinks } from './content/links';
import { AvatarIcon, ExitIcon, ReloadIcon } from '@radix-ui/react-icons';

interface Props {
	username: string;
}

export function UserMenuContent(props: Props) {
	const { username } = props;

	return (
		<>
			<UserMenuContentUser username={username} />
			<ul className="px-4 pb-3 pt-1.5">
				<UserMenuContentLinks
					path="/settings"
					title="Settings"
					icon={<AvatarIcon />}
					disabled={true}
				/>
				<UserMenuContentLinks
					path="/auth/refresh"
					title="Refresh Token"
					icon={<ReloadIcon />}
				/>
				<UserMenuContentLinks
					path="/auth/signout"
					title="Sign Out"
					icon={<ExitIcon />}
				/>
			</ul>
		</>
	);
}
