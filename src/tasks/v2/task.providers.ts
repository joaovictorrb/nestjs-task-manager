import { DataSource } from 'typeorm';
import { TaskEntity } from './task.entity';
/**
 * In the real-world applications you should avoid 
 * magic strings. Both TASK_REPOSITORY and DATA_SOURCE 
 * should be kept in the separated constants.ts file.
 */
export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TaskEntity),
    inject: ['DATA_SOURCE'],
  },
];