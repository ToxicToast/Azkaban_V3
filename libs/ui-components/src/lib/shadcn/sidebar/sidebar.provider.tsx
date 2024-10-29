import { Nullable } from '@toxictoast/azkaban-base-types';
import {
	createContext,
	CSSProperties,
	PropsWithChildren,
	useMemo,
} from 'react';
import {
	SIDEBAR_WIDTH,
	SIDEBAR_WIDTH_ICON,
	SIDEBAR_WIDTH_MOBILE,
} from './sidebar.config';
import { cn } from '../utils';

type SidebarProviderProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	isMobile: boolean;
};

export const SidebarProviderContext =
	createContext<Nullable<SidebarProviderProps>>(null);

export function SidebarProvider(
	props: PropsWithChildren<SidebarProviderProps>,
) {
	const { open, setOpen, isMobile, children } = props;

	const contextValue = useMemo(() => {
		return {
			open,
			setOpen,
			isMobile,
		};
	}, [isMobile, open, setOpen]);

	const sidebarStyles = useMemo<CSSProperties>(() => {
		return {
			'--sidebar-width': isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH,
			'--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
		} as CSSProperties;
	}, [isMobile]);

	return (
		<SidebarProviderContext.Provider value={contextValue}>
			<div
				style={sidebarStyles}
				className={cn(
					'group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full',
				)}
			>
				{children}
			</div>
		</SidebarProviderContext.Provider>
	);
}
