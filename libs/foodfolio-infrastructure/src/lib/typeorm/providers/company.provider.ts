import { CompanyEntity } from '../entities';

export const companyProvider = [
    {
        provide: 'COMPANY_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(CompanyEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
