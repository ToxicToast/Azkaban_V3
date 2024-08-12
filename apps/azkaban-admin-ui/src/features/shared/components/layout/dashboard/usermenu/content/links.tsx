import { ReactNode, useMemo } from 'react';
import { Optional } from '@toxictoast/azkaban-base-types';
import { Link } from 'react-router-dom';

interface Props {
	icon: ReactNode;
	path: string;
	title: string;
	action?: Optional<() => void>;
	disabled?: boolean;
}

export function UserMenuContentLinks(props: Props) {
	const { icon, path, title, action, disabled } = props;

	const getCursor = useMemo(() => {
		return disabled ? 'cursor-not-allowed' : 'cursor-pointer';
	}, [disabled]);

	return (
		<li
			className={`mb-4 border-b border-slate-200 last:border-0 dark:border-slate-700 ${getCursor}`}
			onClick={action}
		>
			<Link to={disabled ? '#' : path} className={getCursor}>
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
