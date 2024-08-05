import { Button } from '../ui';
import { PlusCircleIcon } from 'lucide-react';

interface Props {
	title: string;
	description: string;
	type: string;
	onAdd: () => void;
}

export function PageTitle(props: Props) {
	const { title, description, type, onAdd } = props;

	return (
		<div className="flex flex-row items-center justify-between p-6 px-7">
			<div className="flex flex-col space-y-1.5 p-6 px-7">
				<h3 className="font-semibold leading-none tracking-tight">
					{title}
				</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>

			<Button
				variant="default"
				className="text-xs"
				onClick={() => onAdd()}
			>
				<PlusCircleIcon className="h-3.5 w-3.5" />
				&nbsp;Add {type}
			</Button>
		</div>
	);
}