import { Optional } from '@toxictoast/azkaban-base-types';

export class UpdateCommand {
  constructor(
    public readonly id: string,
    public readonly title?: Optional<string>,
    public readonly slug?: Optional<string>,
    public readonly active?: Optional<boolean>,
  ) {}
}
