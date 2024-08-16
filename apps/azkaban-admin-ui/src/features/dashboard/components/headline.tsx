interface Props {
	title: string;
}

export function DashboardHeadline(props: Props) {
	const { title } = props;

	return (
		<h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
			<span className="lg:sidebar-expanded:block lg:hidden 2xl:block">
				{title}
			</span>
		</h3>
	);
}
