import { PropsWithChildren } from 'react';

interface Props {
	show: boolean;
}

export function Show(props: PropsWithChildren<Props>) {
	if (props.show) {
		return props.children;
	}

	return null;
}
