import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { BoxIcon } from 'lucide-react';

interface Props {
	categories: Array<FoodFolioCategory>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function CategorySelectWidget(props: Props) {
	const { categories, onChange, selectValueText } = props;

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={selectValueText} />
			</SelectTrigger>
			<SelectContent>
				{categories.map((category) => (
					<SelectItem key={category.id} value={category.id}>
						<SelectItemAtom
							icon={<BoxIcon className="size-5" />}
							title={category.title}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
