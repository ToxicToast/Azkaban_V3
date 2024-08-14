import { Badge, Input, Label } from '../ui';
import { Show } from '../../widgets';
import { Optional } from '@toxictoast/azkaban-base-types';

interface Props {
	id: string;
	title: string;
	onChange: (value: string) => void;
	isRequired?: Optional<boolean>;
	onlyShow: boolean;
	defaultValue?: Optional<string>;
}

export function NumberForm(props: Props) {
	const { id, title, onChange, onlyShow, defaultValue, isRequired } = props;

	return (
		<>
			<Label htmlFor={id}>{title}</Label>
			<Show show={!onlyShow}>
				<Input
					id={id}
					type="number"
					className="w-full"
					onChange={(e) => onChange(e.target.value)}
					defaultValue={defaultValue}
					required={isRequired ?? false}
				/>
			</Show>
			<Show show={onlyShow}>
				<Badge id={id}>{defaultValue ?? '-'}</Badge>
			</Show>
		</>
	);
}
