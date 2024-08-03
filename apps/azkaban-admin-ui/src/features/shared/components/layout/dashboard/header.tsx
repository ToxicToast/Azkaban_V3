import { HeaderLeftSide } from './header-left-side';
import { HeaderRightSide } from './header-right-side';
import { ThemeToggle } from './theme-toggle';
import { UserMenu } from './user-menu';

interface Props {
	username: string;
}

export function Header(props: Props) {
	const { username } = props;

	return (
		<header className="sticky top-0 z-30 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-[#182235]">
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="-mb-px flex h-16 items-center justify-between">
					<HeaderLeftSide />
					<HeaderRightSide>
						<ThemeToggle />
						<hr className="h-6 w-px border-none bg-slate-200 dark:bg-slate-700" />
						<UserMenu username={username} />
					</HeaderRightSide>
				</div>
			</div>
		</header>
	);
}
