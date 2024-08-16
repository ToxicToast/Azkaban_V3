import { useEffect } from 'react';
import { sseEndpoint } from '../config/endpoints';

interface Props {
	isAuthenticated: boolean;
	canSeeAzkaban: boolean;
	canSeeFoodfolio: boolean;
}

export function SSE(props: Props) {
	const { isAuthenticated, canSeeFoodfolio, canSeeAzkaban } = props;

	useEffect(() => {
		if (isAuthenticated) {
			const eventSource = new EventSource(sseEndpoint);
			eventSource.onmessage = (event) => {
				console.log(event.data);
			};
			return () => {
				eventSource.close();
			};
		}
	}, [isAuthenticated]);

	return null;
}
