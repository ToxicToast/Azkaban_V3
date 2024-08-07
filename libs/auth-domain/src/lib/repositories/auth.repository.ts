import { AuthAnemic } from '../anemics';
import { Repository } from '@toxictoast/azkaban-base-domain';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface AuthAdditions {
	findByUsername(username: string): Promise<AuthAnemic>;
	findByEmail(email: string): Promise<AuthAnemic>;
	delete(id: string): Promise<void>;
}
type RepositoryWithOnlySave = Pick<Repository<AuthAnemic>, 'save' | 'findById'>;

export type AuthRepository = Chainable<RepositoryWithOnlySave, AuthAdditions>;
