import { Repository } from '@toxictoast/azkaban-base-domain';
import { CompanyAnemic } from '../anemics';
import { Chainable } from '@toxictoast/azkaban-base-types';

interface CompanyAdditions {
	findByTitle(title: string): Promise<CompanyAnemic>;
}

export type CompanyRepository = Chainable<
	CompanyAdditions,
	Repository<CompanyAnemic>
>;
