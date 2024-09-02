import { TokenDAO } from '@azkaban/auth-infrastructure';

export function TokenPresenter(token: TokenDAO) {
	delete token.user.activation_token;
	delete token.user.password;
	return token;
}
