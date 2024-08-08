import { Badge, Input, Label } from '../ui';
import { Show } from '../../widgets';
import { Optional } from '@toxictoast/azkaban-base-types';

interface Props {
	onChange: (value: string) => void;
	isRequired?: Optional<boolean>;
	onlyShow: boolean;
	defaultValue?: Optional<string>;
}

export function TitleForm(props: Props) {
	const { onChange, onlyShow, defaultValue, isRequired } = props;

	return (
		<>
			<Label htmlFor="title">Title</Label>
			<Show show={!onlyShow}>
				<Input
					id="title"
					type="text"
					className="w-full"
					onChange={(e) => onChange(e.target.value)}
					defaultValue={defaultValue}
					required={isRequired ?? false}
				/>
			</Show>
			<Show show={onlyShow}>
				<Badge id="title">{defaultValue ?? '-'}</Badge>
			</Show>
		</>
	);
}
