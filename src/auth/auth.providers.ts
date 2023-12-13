import { DataSource } from 'typeorm';
import { UserEntity } from './user.entity';
/**
 * In the real-world applications you should avoid
 * magic strings. Both TASK_REPOSITORY and DATA_SOURCE
 * should be kept in the separated constants.ts file.
 */
export const authProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(UserEntity),
        inject: ['DATA_SOURCE'],
    },
];
