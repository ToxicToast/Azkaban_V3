import { Controller, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BotService } from './bot.service';
import { Events } from '@toxictoast/azkaban-twitch-bot-events';

@Controller('bot')
export class BotController implements OnModuleInit, OnModuleDestroy {
	constructor(private readonly service: BotService) {}

	async onModuleInit(): Promise<void> {
		this.service.onEvent(Events.JOIN);
		this.service.onEvent(Events.PART);
		this.service.onEvent(Events.MESSAGE);
		this.service.onEvent(Events.TIMEOUT);
		this.service.onEvent(Events.BAN);
		this.service.onEvent(Events.RAID);
		this.service.onEvent(Events.SUB);
		this.service.onEvent(Events.RESUB);
		this.service.onEvent(Events.SUBGIFT);
		this.service.startBot();
	}

	async onModuleDestroy(): Promise<void> {
		this.service.stopBot();
	}
}
