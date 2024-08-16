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
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';

interface Props {
	categories: Array<FoodFolioCategory>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function CategorySelectWidget(props: Props) {
	const { categories, onChange, selectValueText } = props;

	const findParentCategory = useCallback(
		(parent_category_id: Nullable<string>) => {
			return parent_category_id !== null
				? categories.find(
						(category) => category.id === parent_category_id,
					)
				: null;
		},
		[categories],
	);

	const transformTitle = useCallback(
		(category: FoodFolioCategory) => {
			const title = category.title;
			const parentCategory = findParentCategory(category.parent_id);
			if (parentCategory) {
				return `${title} (${parentCategory.title})`;
			}
			return title;
		},
		[findParentCategory],
	);

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
							title={transformTitle(category)}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
