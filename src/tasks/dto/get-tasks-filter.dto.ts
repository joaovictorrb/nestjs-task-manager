import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../v2/task-status.enum";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search?: string;
}