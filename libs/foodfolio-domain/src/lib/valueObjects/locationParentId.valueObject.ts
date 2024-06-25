import { ValueObject } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

export class LocationParentId implements ValueObject<Nullable<string>> {
    readonly _value: Nullable<string>;

    constructor(value?: Optional<Nullable<string>>) {
        this._value = value ?? null;
    }

    equals(valueObject: LocationParentId): boolean {
        return this._value === valueObject._value;
    }

    get value(): Nullable<string> {
        return this._value;
    }
}
