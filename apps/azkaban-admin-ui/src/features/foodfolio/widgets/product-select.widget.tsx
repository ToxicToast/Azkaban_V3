import { FoodFolioItem } from '@toxictoast/azkaban-sdk';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { ShoppingBasketIcon } from 'lucide-react';

interface Props {
	products: Array<FoodFolioItem>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function ProductSelectWidget(props: Props) {
	const { products, onChange, selectValueText } = props;

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={selectValueText} />
			</SelectTrigger>
			<SelectContent>
				{products.map((product) => (
					<SelectItem key={product.id} value={product.id}>
						<SelectItemAtom
							icon={<ShoppingBasketIcon className="size-5" />}
							title={product.title}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
