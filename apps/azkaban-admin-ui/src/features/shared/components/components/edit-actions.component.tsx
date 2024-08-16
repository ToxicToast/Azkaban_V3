import { Button } from '../ui';

interface Props {
	type: string;
	onCancel: () => void;
	onSave: () => void;
}

export function EditActions(props: Props) {
	const { type, onSave, onCancel } = props;

	return (
		<div className="hidden items-center gap-2 md:ml-auto md:flex">
			<Button variant="outline" size="sm" onClick={() => onCancel()}>
				Discard
			</Button>
			<Button size="sm" onClick={() => onSave()}>
				Save {type}
			</Button>
		</div>
	);
}
