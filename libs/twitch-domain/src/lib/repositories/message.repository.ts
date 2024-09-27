import { MessageAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';
import { Repository } from '@toxictoast/azkaban-base-domain';

interface MessageAdditions {
	findByDisplayName(display_name: string): Promise<Array<MessageAnemic>>;
	findByMessageId(message_id: string): Promise<MessageAnemic>;
}

export type MessageRepository = Chainable<
	MessageAdditions,
	Repository<MessageAnemic>
>;
