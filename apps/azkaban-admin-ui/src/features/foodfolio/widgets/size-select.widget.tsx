import { FoodFolioSize } from '@toxictoast/azkaban-sdk';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { ChevronsDownUpIcon } from 'lucide-react';

interface Props {
	sizes: Array<FoodFolioSize>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function SizeSelectWidget(props: Props) {
	const { sizes, onChange, selectValueText } = props;

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={selectValueText} />
			</SelectTrigger>
			<SelectContent>
				{sizes.map((size) => (
					<SelectItem key={size.id} value={size.id}>
						<SelectItemAtom
							icon={<ChevronsDownUpIcon className="size-5" />}
							title={size.title}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
