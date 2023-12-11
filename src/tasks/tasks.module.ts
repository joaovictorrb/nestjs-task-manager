import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksControllerV1 } from './v1/tasks-v1.controller';
import { TasksControllerV2 } from './v2/tasks-v2.controller';
import { TasksServiceV2 } from './v2/tasks-v2.service';
import { TasksServiceV1 } from './v1/tasks-v1.service';
import { Task } from './v2/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [
    TasksControllerV1, 
    TasksControllerV2
  ],
  providers: [
    TasksServiceV1,
    TasksServiceV2
  ]
})
export class TasksModule {}
