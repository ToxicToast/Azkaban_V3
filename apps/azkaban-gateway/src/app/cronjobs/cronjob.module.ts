import { Module } from '@nestjs/common';
import { AuthGuard } from '../../guards';
import { JwtModule } from '@nestjs/jwt';
import { CronjobController } from './cronjob.controller';
import { CronjobService } from './cronjob.service';
@Module({
	imports: [JwtModule],
	controllers: [CronjobController],
	providers: [AuthGuard, CronjobService],
})
export class CronjobModule {}
