import { ValueObject } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { StringGeneratorHelper } from '@toxictoast/azkaban-base-helpers';

export class AuthActivationCode implements ValueObject<string> {
    readonly _value: Nullable<string>;

    constructor(value?: Optional<string>, nullable?: Optional<boolean>) {
        let realValue = value ?? null;
        if (nullable !== true) {
            realValue = realValue ?? StringGeneratorHelper.create(12).value;
        }

        this._value = realValue;
    }

    equals(valueObject: AuthActivationCode): boolean {
        return this._value === valueObject._value;
    }

    get value(): string {
        return this._value;
    }
}
