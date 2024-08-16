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
import { useCallback } from 'react';
import { Nullable } from '@toxictoast/azkaban-base-types';

interface Props {
	locations: Array<FoodFolioLocation>;
	onChange: (id: string) => void;
	selectValueText: string;
}

export function LocationSelectWidget(props: Props) {
	const { locations, onChange, selectValueText } = props;

	const findParentLocation = useCallback(
		(parent_location_id: Nullable<string>) => {
			return parent_location_id !== null
				? locations.find(
						(location) => location.id === parent_location_id,
					)
				: null;
		},
		[locations],
	);

	const transformTitle = useCallback(
		(location: FoodFolioLocation) => {
			const title = location.title;
			const parentLocation = findParentLocation(location.parent_id);
			if (parentLocation) {
				return `${title} (${parentLocation.title})`;
			}
			return title;
		},
		[findParentLocation],
	);

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
							title={transformTitle(location)}
						/>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
