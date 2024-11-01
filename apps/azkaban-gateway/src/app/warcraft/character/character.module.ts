import { Module } from '@nestjs/common';
import { CachingModule } from '../../core/caching.module';
import { JwtModule } from '@nestjs/jwt';
import { NotifyServiceModule } from '../../core/notifiy-service.module';
import { CharacterController } from './character.controller';
import { AuthGuard } from '../../../guards';
import { NotifyService } from '../notify.service';
import { CharacterService } from './character.service';
import { WarcraftCharacterServiceModule } from '../../core/warcraft-character-service.module';

@Module({
	imports: [
		CachingModule,
		JwtModule,
		WarcraftCharacterServiceModule,
		NotifyServiceModule,
	],
	controllers: [CharacterController],
	providers: [AuthGuard, NotifyService, CharacterService],
})
export class CharacterModule {}
