import { Module } from '@nestjs/common';
import { TasksControllerV1 } from './v1/tasks-v1.controller';
import { TasksControllerV2 } from './v2/tasks-v2.controller';
import { TasksServiceV2 } from './v2/tasks-v2.service';
import { TasksServiceV1 } from './v1/tasks-v1.service';
import { taskProviders } from './v2/task.providers';
import { DatabaseModule } from 'src/db/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [TasksControllerV1, TasksControllerV2],
    providers: [...taskProviders, TasksServiceV1, TasksServiceV2],
})
export class TasksModule {}
