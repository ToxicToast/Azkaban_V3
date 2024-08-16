import { useAppSelector } from '../store';
import { selectConfigBaseUrl, selectConfigVersion } from './config.selector';

export function useConfigState() {
	const baseUrl = useAppSelector(selectConfigBaseUrl);
	const version = useAppSelector(selectConfigVersion);

	return {
		baseUrl,
		version,
	};
}
