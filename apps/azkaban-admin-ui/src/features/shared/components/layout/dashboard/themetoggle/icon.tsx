import { Show } from '../../../../widgets';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

interface Props {
	theme: string;
}

export function ThemeToggleIcon(props: Props) {
	const { theme } = props;

	return (
		<>
			<Show show={theme === 'light'}>
				<MoonIcon />
			</Show>
			<Show show={theme === 'dark'}>
				<SunIcon />
			</Show>
		</>
	);
}
