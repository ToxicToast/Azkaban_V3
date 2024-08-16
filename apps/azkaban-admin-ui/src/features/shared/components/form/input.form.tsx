import { Optional } from '@toxictoast/azkaban-base-types';
import { Input } from '../ui';

interface Props {
	id: string;
	type: 'text' | 'number';
	onChange: (value: string) => void;
	isRequired?: Optional<boolean>;
	defaultValue?: Optional<string>;
}

export function InputForm(props: Props) {
	const { id, type, onChange, defaultValue, isRequired } = props;

	return (
		<Input
			id={id}
			type={type}
			className="w-full"
			onChange={(e) => onChange(e.target.value)}
			defaultValue={defaultValue}
			required={isRequired ?? false}
		/>
	);
}
