import { UserDAO } from '@azkaban/user-infrastructure';

export function UserPresenter(user: UserDAO) {
	delete user.password;
	delete user.activation_token;
	return user;
}
