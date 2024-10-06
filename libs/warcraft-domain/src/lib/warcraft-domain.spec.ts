import { warcraftDomain } from './warcraft-domain';

describe('warcraftDomain', () => {
	it('should work', () => {
		expect(warcraftDomain()).toEqual('warcraft-domain');
	});
});
