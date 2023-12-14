import { DataSource } from 'typeorm';
import { env } from 'process';
export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: env.DB_HOST,
                port: parseInt(env.DB_PORT),
                username: env.DB_USERNAME,
                password: env.DB_PASSWORD,
                database: env.DB_NAME,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                // Setting synchronize: true shouldn't be used in
                // production - otherwise you can lose production data.
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
