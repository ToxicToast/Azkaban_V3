import { Module } from '@nestjs/common';
import {
	datasourceProvider,
	MessageEntity,
	messageProvider,
} from '@azkaban/twitch-infrastructure';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
	controllers: [MessageController],
	providers: [
		...datasourceProvider([MessageEntity]),
		...messageProvider,
		MessageService,
	],
})
export class MessageModule {}
