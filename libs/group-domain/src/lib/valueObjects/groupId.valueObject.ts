import { ValueObject } from '@toxictoast/azkaban-base-domain';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { UuidHelper } from '@toxictoast/azkaban-base-helpers';

export class GroupId implements ValueObject<string> {
  readonly _value: Nullable<string>;

  constructor(value?: Optional<string>) {
    this._value = value ?? UuidHelper.create().value;
  }

  equals(valueObject: GroupId): boolean {
    return this._value === valueObject._value;
  }

  get value(): string {
    return this._value;
  }
}
