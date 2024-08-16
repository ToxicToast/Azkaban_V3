import { FoodFolioType } from '@toxictoast/azkaban-sdk';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { BoxesIcon } from 'lucide-react';

interface Props {
	types: Array<FoodFolioType>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function TypeSelectWidget(props: Props) {
	const { types, onChange, selectValueText } = props;

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={selectValueText} />
			</SelectTrigger>
			<SelectContent>
				{types.map((type) => (
					<SelectItem key={type.id} value={type.id}>
						<SelectItemAtom
							icon={<BoxesIcon className="size-5" />}
							title={type.title}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
