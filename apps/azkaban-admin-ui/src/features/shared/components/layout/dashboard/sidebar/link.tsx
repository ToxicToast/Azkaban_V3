import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarLinkIcon } from './icon';
import { CubeIcon } from '@radix-ui/react-icons';

interface Props {
	path: string;
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | any;
}

export function SidebarLink(props: Props) {
	const { path, title, icon } = props;
	const location = useLocation();

	return (
		<li
			className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
				location.pathname === path
					? 'bg-slate-300 dark:bg-slate-900'
					: ''
			}`}
		>
			<Link
				to={path}
				className={`block truncate transition duration-150 hover:text-white dark:text-slate-200 ${
					location.pathname === path
						? 'hover:text-slate-200 dark:text-white dark:hover:text-white'
						: ''
				}`}
			>
				<div className="flex items-center">
					<SidebarLinkIcon icon={icon} />
					<span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
						{title}
					</span>
				</div>
			</Link>
		</li>
	);
}
