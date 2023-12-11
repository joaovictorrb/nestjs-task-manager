import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
