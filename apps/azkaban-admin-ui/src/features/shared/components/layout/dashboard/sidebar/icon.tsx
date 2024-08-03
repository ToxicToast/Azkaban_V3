interface Props {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | any;
}

export function SidebarLinkIcon(props: Props) {
	const { icon: Icon } = props;

	return <Icon className="h-4 w-4 shrink-0" />;
}
