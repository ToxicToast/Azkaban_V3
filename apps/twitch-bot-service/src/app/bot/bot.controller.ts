import { Controller, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BotService } from './bot.service';
import { Events } from '@toxictoast/azkaban-twitch-bot-events';

@Controller('bot')
export class BotController implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly service: BotService) {}

	async onModuleInit(): Promise<void> {
		this.service.onEvent(Events.MESSAGE);
		this.service.onEvent(Events.MESSAGEREMOVE);
		//
		this.service.onEventNotify(Events.JOIN);
		this.service.onEventNotify(Events.PART);
		this.service.onEventNotify(Events.MESSAGE);
		this.service.onEventNotify(Events.TIMEOUT);
		this.service.onEventNotify(Events.BAN);
		this.service.onEventNotify(Events.RAID);
		this.service.onEventNotify(Events.SUB);
		//
		this.service.startBot();
	}

	async onModuleDestroy(): Promise<void> {
		this.service.stopBot();
	}
}
