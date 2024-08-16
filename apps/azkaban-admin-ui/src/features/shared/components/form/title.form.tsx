import { Badge, Input, Label } from '../ui';
import { Show } from '../../widgets';
import { Optional } from '@toxictoast/azkaban-base-types';
import { InputForm } from './input.form';

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
				<InputForm
					id="title"
					type="text"
					isRequired={isRequired}
					onChange={onChange}
					defaultValue={defaultValue}
				/>
			</Show>
			<Show show={onlyShow}>
				<Badge id="title">{defaultValue ?? '-'}</Badge>
			</Show>
		</>
	);
}
