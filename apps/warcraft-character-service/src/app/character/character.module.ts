import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import {
	CharacterEntity,
	characterProvider,
	datasourceProvider,
} from '@azkaban/warcraft-infrastructure';

@Module({
	controllers: [CharacterController],
	providers: [
		...datasourceProvider([CharacterEntity]),
		...characterProvider,
		CharacterService,
	],
})
export class CharacterModule {}
