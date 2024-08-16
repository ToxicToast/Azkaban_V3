import { FoodFolioWarehouse } from '@toxictoast/azkaban-sdk';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { WarehouseIcon } from 'lucide-react';

interface Props {
	warehouses: Array<FoodFolioWarehouse>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function WarehouseSelectWidget(props: Props) {
	const { warehouses, onChange, selectValueText } = props;

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={selectValueText} />
			</SelectTrigger>
			<SelectContent>
				{warehouses.map((warehouse) => (
					<SelectItem key={warehouse.id} value={warehouse.id}>
						<SelectItemAtom
							icon={<WarehouseIcon className="size-5" />}
							title={warehouse.title}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
