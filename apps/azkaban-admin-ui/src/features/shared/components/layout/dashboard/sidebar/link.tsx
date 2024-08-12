import { ReactNode, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarLinkIcon } from './icon';
import { CubeIcon } from '@radix-ui/react-icons';
import { Optional } from '@toxictoast/azkaban-base-types';

interface Props {
	path: string;
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | any;
	otherPaths?: Optional<Array<string>>;
	disabled?: boolean;
}

export function SidebarLink(props: Props) {
	const { path, title, icon, disabled } = props;
	const location = useLocation();

	const isActive = useCallback(() => {
		const pathName = location.pathname;
		const paths = [path, ...(props.otherPaths || [])];
		return paths.some((p) => pathName.startsWith(p));
	}, [location.pathname, path, props.otherPaths]);

	const getCursor = useMemo(() => {
		return disabled ? 'cursor-not-allowed' : 'cursor-pointer';
	}, [disabled]);

	return (
		<li
			className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
				isActive() ? 'bg-slate-300 dark:bg-slate-900' : ''
			} ${getCursor} `}
		>
			<Link
				to={disabled ? '#' : path}
				className={`block truncate transition duration-150 hover:text-white dark:text-slate-200 ${
					isActive()
						? 'hover:text-slate-200 dark:text-white dark:hover:text-white'
						: ''
				} ${getCursor}`}
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
