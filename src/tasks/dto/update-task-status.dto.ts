import { IsEnum } from 'class-validator';
import { TaskStatus } from '../v2/task-status.enum';

export class UpdateTaskStatusDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
