import { Controller, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BotService } from './bot.service';
import { NotifyService } from './notify.service';
import { MessageService } from './message.service';
import { ViewerService } from './viewer.service';

@Controller('bot')
export class BotController implements OnModuleInit, OnModuleDestroy {
	constructor(
		private readonly service: BotService,
		private readonly notifyService: NotifyService,
		private readonly messageService: MessageService,
		private readonly viewerService: ViewerService,
	) {}

	async onModuleInit(): Promise<void> {
		this.notifyService.initEvents();
		this.messageService.initEvents();
		this.viewerService.initEvents();
		//
		this.service.startBot();
	}

	async onModuleDestroy(): Promise<void> {
		this.service.stopBot();
	}
}
