import { Factory } from '@toxictoast/azkaban-base-domain';
import { UserAnemic } from '../anemics';
import { UserAggregate } from '../aggregates';
import { UserData } from '../data';
import { UserActivationCode, UserId, UserPassword } from '../valueObjects';

export class UserFactory
	implements Factory<UserAnemic, UserAggregate, UserData>
{
	reconstitute(data: UserAnemic): UserAggregate {
		const {
			id,
			username,
			email,
			password,
			activation_token,
			activated_at,
			banned_at,
			created_at,
			updated_at,
			deleted_at,
			groups,
			loggedin_at,
		} = data;

		const userId = new UserId(id);
		const userActivationCode = new UserActivationCode(
			activation_token,
			true,
		);

		return new UserAggregate(
			userId.value,
			username,
			password,
			email,
			userActivationCode.value,
			activated_at,
			banned_at,
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
			groups,
		);
	}

	constitute(data: UserAggregate): UserAnemic {
		const {
			id,
			username,
			password,
			email,
			activated_at,
			activation_token,
			banned_at,
			created_at,
			updated_at,
			deleted_at,
			isActive,
			isUpdated,
			isDeleted,
			isBanned,
			groups,
			loggedin_at,
		} = data.toAnemic();

		const userId = new UserId(id);
		const userActivationCode = new UserActivationCode(
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
			loggedin_at,
			created_at,
			updated_at,
			deleted_at,
			isActive,
			isUpdated,
			isDeleted,
			isBanned,
			groups,
		};
	}

	createDomain(data: UserData): UserAggregate {
		const { username, password, email } = data;
		const userId = new UserId();
		const activationToken = new UserActivationCode();
		const hashedPassword = new UserPassword(password);
		return new UserAggregate(
			userId.value,
			username,
			hashedPassword.value,
			email,
			activationToken.value,
			null,
			null,
			null,
			new Date(),
			null,
			null,
			[],
		);
	}
}
