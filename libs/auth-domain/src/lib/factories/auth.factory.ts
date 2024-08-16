import { Factory } from '@toxictoast/azkaban-base-domain';
import { AuthAnemic } from '../anemics';
import { AuthAggregate } from '../aggregates';
import { AuthData } from '../data';
import { AuthActivationCode, AuthId, AuthPassword } from '../valueObjects';

export class AuthFactory
	implements Factory<AuthAnemic, AuthAggregate, AuthData>
{
	reconstitute(data: AuthAnemic): AuthAggregate {
		const {
			id,
			username,
			email,
			password,
			activation_token,
			activated_at,
			banned_at,
			groups,
			loggedin_at,
		} = data;

		const userId = new AuthId(id);
		const userActivationCode = new AuthActivationCode(
			activation_token,
			true,
		);

		return new AuthAggregate(
			userId.value,
			username,
			password,
			email,
			userActivationCode.value,
			activated_at,
			banned_at,
			loggedin_at,
			groups,
		);
	}

	constitute(data: AuthAggregate): AuthAnemic {
		const {
			id,
			username,
			password,
			email,
			activated_at,
			activation_token,
			banned_at,
			isActive,
			isBanned,
			groups,
			loggedin_at,
		} = data.toAnemic();

		const userId = new AuthId(id);
		const userActivationCode = new AuthActivationCode(
			activation_token,
			true,
		);

		return {
			id: userId.value,
			username,
			email,
			password,
			activation_token: userActivationCode.value,
			activated_at,
			banned_at,
			isActive,
			isBanned,
			loggedin_at,
			groups,
		};
	}

	createDomain(data: AuthData): AuthAggregate {
		const { username, password, email } = data;
		const userId = new AuthId();
		const activationToken = new AuthActivationCode();
		const hashedPassword = new AuthPassword(password);
		return new AuthAggregate(
			userId.value,
			username,
			hashedPassword.value,
			email,
			activationToken.value,
			null,
			null,
			null,
			[],
		);
	}
}
