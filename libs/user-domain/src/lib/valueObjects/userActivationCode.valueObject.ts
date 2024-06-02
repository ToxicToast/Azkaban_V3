import { ValueObject } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { StringGeneratorHelper } from '@toxictoast/azkaban-base-helpers';

export class UserActivationCode implements ValueObject<string> {
  readonly _value: Nullable<string>;

  constructor(value?: Optional<string>, nullable?: Optional<boolean>) {
    this._value =
      value ?? nullable === true
        ? null
        : StringGeneratorHelper.create(12).value;
  }

  equals(valueObject: UserActivationCode): boolean {
    return this._value === valueObject._value;
  }

  get value(): string {
    return this._value;
  }
}
