export interface ApiDAO {
	gender: {
		type: string;
		name: string;
	};
	faction: {
		type: string;
		name: string;
	};
	race: {
		name: string;
		id: number;
	};
	character_class: {
		name: string;
		id: number;
	};
	active_spec: {
		name: string;
		id: number;
	};
	guild: {
		name: string;
		id: number;
	};
	level: number;
	average_item_level: number;
	equipped_item_level: number;
}
