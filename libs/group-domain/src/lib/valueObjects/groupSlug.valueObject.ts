import { ValueObject } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { SlugHelper } from '@toxictoast/azkaban-base-helpers';

export class GroupSlug implements ValueObject<string> {
    readonly _value: Nullable<string>;

    constructor(value?: Optional<string>, title?: Optional<string>) {
        const generatedSlug = SlugHelper.create(title).value;
        this._value = value ?? generatedSlug;
    }

    equals(valueObject: GroupSlug): boolean {
        return this._value === valueObject._value;
    }

    get value(): string {
        return this._value;
    }
}
