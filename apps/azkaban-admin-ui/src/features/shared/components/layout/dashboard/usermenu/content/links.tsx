import { ReactNode } from 'react';
import { Optional } from '@toxictoast/azkaban-base-types';
import { Link } from 'react-router-dom';

interface Props {
	icon: ReactNode;
	path: string;
	title: string;
	action?: Optional<() => void>;
}

export function UserMenuContentLinks(props: Props) {
	const { icon, path, title, action } = props;

	return (
		<li
			className="mb-4 border-b border-slate-200 last:border-0 dark:border-slate-700"
			onClick={action}
		>
			<Link to={path}>
				<span className="mb-4 flex text-sm">
					{icon}
					<span className="pl-2 font-medium text-slate-800 hover:text-slate-950 dark:text-slate-100 dark:hover:text-slate-300">
						{title}
					</span>
				</span>
			</Link>
		</li>
	);
}
