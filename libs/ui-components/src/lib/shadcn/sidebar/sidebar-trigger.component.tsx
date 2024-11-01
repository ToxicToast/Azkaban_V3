import { Optional } from '@toxictoast/azkaban-base-types';
import { Button } from '../button';
import { cn } from '../utils';

type Props = {
	className?: Optional<string>;
	onClick?: Optional<() => void>;
};

export function SidebarTrigger(props: Props) {
	const { className, onClick } = props;

	return (
		<Button
			data-sidebar="trigger"
			variant="ghost"
			size="icon"
			className={cn('h-7 w-7', className)}
			onClick={() => {
				onClick?.();
			}}
		>
			PanelLeft
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}
