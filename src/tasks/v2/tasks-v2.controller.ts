import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Task } from "./task.entity";
import { TasksServiceV2 } from "./tasks-v2.service";
import { CreateTaskDto } from "../dto/create-task.dto";

@Controller('tasks/v2')
export class TasksControllerV2 {
    constructor(private tasksService: TasksServiceV2) {}

    @Get('/:id')
    async getTaskById(
        @Param('id') id: string
    ): Promise<Task> {
        return await this.tasksService.getTaskById(id);
    }

    @Post('new')
    async createNewTaskV2(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.tasksService.createNewTask(createTaskDto);
    }
}