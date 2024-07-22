import { WarehouseEntity } from '../entities';

export const warehouseProvider = [
    {
        provide: 'WAREHOUSE_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(WarehouseEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
