import { ValueObject } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { UuidHelper } from '@toxictoast/azkaban-base-helpers';

export class ItemVariantId implements ValueObject<string> {
	readonly _value: Nullable<string>;

	constructor(
		value?: Optional<string>,
		isNullable: Optional<boolean> = false,
	) {
		const createUuid = !isNullable ? UuidHelper.create().value : null;
		this._value = value ?? createUuid;
	}

	equals(valueObject: ItemVariantId): boolean {
		return this._value === valueObject._value;
	}

	get value(): string {
		return this._value;
	}
}
