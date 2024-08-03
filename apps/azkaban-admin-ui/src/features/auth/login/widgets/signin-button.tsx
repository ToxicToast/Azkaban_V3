import { ReloadIcon } from '@radix-ui/react-icons';
import { Button, Show } from '../../../shared';

interface Props {
	onClick: () => void;
	disabled: boolean;
}

export function SignInButton(props: Props) {
	const { onClick, disabled } = props;

	return (
		<Button
			className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600"
			onClick={() => onClick()}
			disabled={disabled}
		>
			<Show show={disabled}>
				<ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
			</Show>
			<Show show={!disabled}>Sign In</Show>
		</Button>
	);
}
