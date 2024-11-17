import { Inject, Injectable, Logger } from '@nestjs/common';
import { wow } from 'blizzard.js';
import { WoWClient } from 'blizzard.js/dist/wow';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { AccessToken } from 'blizzard.js/dist/core';
import { Origins } from 'blizzard.js/dist/endpoints';
import { CharacterDAO } from '@azkaban/warcraft-infrastructure';

@Injectable()
export class ApiService {
	private wowclient: WoWClient = null;
	private access_token: Nullable<AccessToken> = null;

	constructor(
		@Inject('BLIZZARD_CLIENT_ID') private readonly clientId: string,
		@Inject('BLIZZARD_CLIENT_SECRET') private readonly clientSecret: string,
	) {}

	async setApiClient(region?: Optional<Origins>) {
		const defaultRegion = region ?? 'eu';
		this.wowclient = await wow.createInstance(
			{
				key: this.clientId,
				secret: this.clientSecret,
				origin: defaultRegion,
			},
			(token) => {
				this.access_token = token;
			},
		);
	}

	async getCharacter(realm: string, name: string) {
		try {
			const character = await this.wowclient?.characterProfile({
				realm,
				name,
			});
			return character?.data;
		} catch (e) {
			Logger.error(e);
			throw new Error(e);
		}
	}
}
