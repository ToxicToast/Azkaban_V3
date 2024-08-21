import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { MobileService } from './mobile.service';

@UseGuards(ThrottlerGuard)
@Controller('mobile')
export class MobileController {
	constructor(private readonly mobileService: MobileService) {}

	@Get('foodfolio/items')
	async getFoodfolioItems() {
		try {
			return await this.mobileService.getFoodfolioItems(0, 0);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
