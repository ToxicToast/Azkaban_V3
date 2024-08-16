import { ReactNode } from 'react';

interface Props {
	icon: ReactNode;
}

export function SidebarLinkIcon(props: Props) {
	const { icon } = props;

	return <>{icon}</>;
}
