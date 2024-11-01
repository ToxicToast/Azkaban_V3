import { Either, Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { Fragment, PropsWithChildren, useMemo, useRef } from 'react';
import { cn } from '../utils';
import { useSidebar } from './sidebar.hook';

type Props = {
	side?: Optional<Either<'left', 'right'>>;
	variant?: Optional<'sidebar' | 'floating' | 'inset'>;
	collapsible?: Optional<'offcanvas' | 'icon' | 'none'>;
	className?: Optional<string>;
};

export function Sidebar(props: PropsWithChildren<Props>) {
	const { side, variant, collapsible, className, children } = props;
	const { open, isMobile } = useSidebar();
	const ref = useRef<Nullable<HTMLDivElement>>(null);

	const defaultSide = useMemo(() => {
		return side ?? 'left';
	}, [side]);

	const defaultVariant = useMemo(() => {
		return variant ?? 'sidebar';
	}, [variant]);

	const defaultCollapsible = useMemo(() => {
		return collapsible ?? 'offcanvas';
	}, [collapsible]);

	const state = useMemo(() => {
		return open ? 'extended' : 'collapsed';
	}, [open]);

	const collapsibleNoneLayout = useMemo(() => {
		return (
			<div
				className={cn(
					'bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col',
					className,
				)}
			>
				{children}
			</div>
		);
	}, [children, className]);

	const mobileLayout = useMemo(() => {
		return (
			<Fragment key="Sheet">
				<Fragment key="SheetContent">
					<div className="flex h-full w-full flex-col">
						{children}
					</div>
				</Fragment>
			</Fragment>
		);
	}, [children]);

	const isVariantFloatingOrInset = useMemo(() => {
		return defaultVariant === 'floating' || defaultVariant === 'inset';
	}, [defaultVariant]);

	if (defaultCollapsible === 'none') {
		return collapsibleNoneLayout;
	}

	if (isMobile) {
		return mobileLayout;
	}

	return (
		<div
			ref={ref}
			className="text-sidebar-foreground group peer hidden md:block"
			data-state={state}
			data-collapsible={state === 'collapsed' ? defaultCollapsible : ''}
			data-variant={defaultVariant}
			data-side={defaultSide}
		>
			<div
				className={cn(
					'relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
					'group-data-[collapsible=offcanvas]:w-0',
					'group-data-[side=right]:rotate-180',
					isVariantFloatingOrInset
						? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
						: 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
				)}
			/>
			<div
				className={cn(
					'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex',
					defaultSide === 'left'
						? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
						: 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
					isVariantFloatingOrInset
						? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
						: 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
					className,
				)}
			>
				<div
					data-sidebar="sidebar"
					className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
				>
					{children}
				</div>
			</div>
		</div>
	);
}
