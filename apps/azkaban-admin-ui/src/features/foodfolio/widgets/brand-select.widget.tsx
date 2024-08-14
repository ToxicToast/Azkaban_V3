import { FoodFolioCompany } from '@toxictoast/azkaban-sdk';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { AppleIcon } from 'lucide-react';

interface Props {
	brands: Array<FoodFolioCompany>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function BrandSelectWidget(props: Props) {
	const { brands, onChange, selectValueText } = props;

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={selectValueText} />
			</SelectTrigger>
			<SelectContent>
				{brands.map((brand) => (
					<SelectItem key={brand.id} value={brand.id}>
						<SelectItemAtom
							icon={<AppleIcon className="size-5" />}
							title={brand.title}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
