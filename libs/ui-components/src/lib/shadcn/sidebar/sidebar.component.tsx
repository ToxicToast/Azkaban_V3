import { Either, Optional } from '@toxictoast/azkaban-base-types';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import { useSidebar } from '@azkaban/ui-components';
import { cn } from '../utils';
import { Show } from '../../widgets';

type Props = {
	side?: Optional<Either<'left', 'right'>>;
	variant?: Optional<'sidebar' | 'floating' | 'inset'>;
	callapsible?: Optional<'offcanvas' | 'icon' | 'none'>;
};

export function Sidebar(props: PropsWithChildren<Props>) {
	const { side, variant, callapsible, children } = props;
	const { open, setOpen, isMobile } = useSidebar();

	const defaultSide = useMemo(() => {
		return side ?? 'left';
	}, [side]);

	const defaultVariant = useMemo(() => {
		return variant ?? 'sidebar';
	}, [variant]);

	const defaultCallapsible = useMemo(() => {
		return callapsible ?? 'offcanvas';
	}, [callapsible]);

	const collapsibleNoneLayout = useCallback(() => {
		return (
			<div
				className={cn(
					'bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col',
				)}
			>
				{children}
			</div>
		);
	}, [children]);

	return (
		<>
			<Show show={callapsible === 'none'}>{collapsibleNoneLayout()}</Show>
			<Show show={callapsible !== 'none'}>OTHER LAYOUT</Show>
		</>
	);
}
