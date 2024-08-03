interface Props {
	data: unknown;
}

export function Debugger(props: Props) {
	const { data } = props;

	return <pre>{JSON.stringify(data, null, 4)}</pre>;
}
