import { ValueObject } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import {
  HashPasswordHelper,
  StringGeneratorHelper,
} from '@toxictoast/azkaban-base-helpers';

export class UserPassword implements ValueObject<string> {
  readonly _value: Nullable<string>;

  constructor(value?: Optional<string>) {
    const generatedString = StringGeneratorHelper.create(16).value;
    this._value = HashPasswordHelper(
      process.env.PASSWORD_SALT,
      value ?? generatedString,
    );
  }

  equals(valueObject: ValueObject<string>): boolean {
    return this._value === valueObject._value;
  }

  get value(): string {
    return this._value;
  }
}
