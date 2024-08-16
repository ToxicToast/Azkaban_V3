interface Props {
	icon: JSX.Element;
	title: string;
}

export function SelectItemAtom(props: Props) {
	const { icon, title } = props;

	return (
		<div className="flex items-start gap-3 text-muted-foreground">
			{icon}
			<div className="grid gap-0.5">
				<p>
					<span className="font-medium text-foreground">{title}</span>
				</p>
			</div>
		</div>
	);
}
