import { Avatar, AvatarFallback } from '../../../ui';
import { useMemo } from 'react';

interface Props {
	username: string;
}

export function UserMenuTrigger(props: Props) {
	const { username } = props;

	const initials = useMemo(() => {
		return username
			.split(' ')
			.map((name) => name[0] + name[1])
			.join('')
			.toUpperCase();
	}, [username]);

	return (
		<div className="inline-flex items-center gap-3">
			<div>
				<Avatar>
					<AvatarFallback className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80">
						{initials}
					</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}
