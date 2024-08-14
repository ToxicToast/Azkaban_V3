import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../shared';
import { SelectItemAtom } from '../../shared/components/atoms/select-item.atom';
import { LocateIcon } from 'lucide-react';

interface Props {
	locations: Array<FoodFolioLocation>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function LocationSelectWidget(props: Props) {
	const { locations, onChange, selectValueText } = props;

	return (
		<Select onValueChange={(value) => onChange(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={selectValueText} />
			</SelectTrigger>
			<SelectContent>
				{locations.map((location) => (
					<SelectItem key={location.id} value={location.id}>
						<SelectItemAtom
							icon={<LocateIcon className="size-5" />}
							title={location.title}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
